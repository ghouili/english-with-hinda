import { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { submitAccessKey } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2, AlertCircle } from "lucide-react";

const GRANT_KEY = "ewh_access";

function hasValidGrant(): boolean {
  try {
    const raw = localStorage.getItem(GRANT_KEY);
    if (!raw) return false;
    const { expiresAt } = JSON.parse(raw);
    return typeof expiresAt === "number" && expiresAt > Date.now();
  } catch {
    return false;
  }
}

function storeGrant(data: { token: string; expiresAt: number }) {
  localStorage.setItem(GRANT_KEY, JSON.stringify(data));
}

export function AccessGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const { lang, toggleLang } = useLanguage();

  // Admin area is exempt — it has its own login and is where the key is managed.
  const exempt =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/login");

  const [granted, setGranted] = useState(hasValidGrant);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Auto-unlock from a shared ?key=... link, then strip it from the URL.
  useEffect(() => {
    if (granted) return;
    const params = new URLSearchParams(location.search);
    const key = params.get("key");
    if (!key) return;
    setVerifying(true);
    setError("");
    submitAccessKey(key)
      .then((data) => {
        storeGrant(data);
        setGranted(true);
      })
      .catch(() => setError(t("access.invalid")))
      .finally(() => {
        setVerifying(false);
        params.delete("key");
        const clean =
          location.pathname + (params.toString() ? `?${params}` : "") + location.hash;
        window.history.replaceState(null, "", clean);
      });
  }, [location.search, location.pathname, location.hash, granted, t]);

  if (exempt || isAdmin || granted) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const data = await submitAccessKey(code.trim());
      storeGrant(data);
      setGranted(true);
    } catch {
      setError(t("access.invalid"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/new-logo.png" alt="English With Henda" className="h-14 w-auto" />
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-serif text-2xl font-bold">{t("access.title")}</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t("access.body")}</p>

          {verifying ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> {t("access.checking")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t("access.placeholder")}
                className="text-center"
                autoComplete="off"
                dir="ltr"
                aria-label={t("access.placeholder")}
              />
              {error && (
                <p className="flex items-center justify-center gap-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </p>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? t("access.checking") : t("access.submit")}
              </Button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </div>
    </div>
  );
}
