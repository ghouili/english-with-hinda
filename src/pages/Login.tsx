import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await loginAdmin(email, password);
      login(token);
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Login — English With Henda"
        description="Admin sign-in for English With Henda."
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/40 to-background min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10" />
        </div>

        <div className="container relative py-12">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/95 p-6 md:p-8 shadow-xl">
            <div className="text-center">
              <p className="text-sm tracking-wide uppercase font-semibold text-primary">
                Admin access
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-foreground">
                Sign In
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Enter your credentials to manage resources.
              </p>
            </div>

            {error && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-9"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1.5 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
                <LogIn className="mr-2 h-4 w-4" />
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/" className="text-primary hover:underline">
                ← Back to site
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
