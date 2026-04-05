import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Eye, EyeOff, FileText, Headphones, BookOpen, CheckCircle, AlertCircle } from "lucide-react";

const STORAGE_KEY = "ewh_resources_v1";

interface LocalResource {
  id: string;
  title: string;
  level: string;
  format: string;
  skill: string;
  description: string;
  url: string;
  duration?: string;
  pages?: number;
  tags?: string[];
  created_at: string;
}

function generateId() {
  return `res-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getStoredResources(): LocalResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveResources(items: LocalResource[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const LEVELS = ["4th", "5th", "6th", "7th", "8th", "9th"];
const FORMATS = ["PDF", "Audio", "Article"];
const SKILLS = ["Grammar", "Vocabulary", "Reading", "Writing", "Listening"];
const FORMAT_ICONS = { PDF: FileText, Audio: Headphones, Article: BookOpen };

const LEVEL_BADGE: Record<string, string> = {
  "4th": "bg-grade-4 text-grade-4-foreground",
  "5th": "bg-grade-5 text-grade-5-foreground",
  "6th": "bg-grade-6 text-grade-6-foreground",
  "7th": "bg-grade-7 text-grade-7-foreground",
  "8th": "bg-grade-8 text-grade-8-foreground",
  "9th": "bg-grade-9 text-grade-9-foreground",
};

const emptyForm = { title: "", level: "", format: "", skill: "", description: "", url: "", duration: "", pages: "", tags: "" };

export default function AddResource() {
  const { t } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resources, setResources] = useState<LocalResource[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { setResources(getStoredResources()); }, []);

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title || form.title.length < 4) e.title = "Title must be at least 4 characters.";
    if (!form.level) e.level = "Select a level.";
    if (!form.format) e.format = "Select a format.";
    if (!form.skill) e.skill = "Select a skill.";
    if (!form.description || form.description.length < 20) e.description = "Description must be at least 20 characters.";
    if (!form.url || !/^https?:\/\/.+/.test(form.url)) e.url = "Enter a valid URL (starts with http:// or https://).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newRes: LocalResource = {
      id: editingId || generateId(),
      title: form.title,
      level: form.level,
      format: form.format.toLowerCase(),
      skill: form.skill.toLowerCase(),
      description: form.description,
      url: form.url,
      duration: form.duration || undefined,
      pages: form.pages ? Number(form.pages) : undefined,
      tags: form.tags ? form.tags.split(",").map((tg) => tg.trim()).filter(Boolean) : [],
      created_at: editingId ? resources.find(r => r.id === editingId)?.created_at || new Date().toISOString() : new Date().toISOString(),
    };

    let updated: LocalResource[];
    if (editingId) {
      updated = resources.map(r => r.id === editingId ? newRes : r);
      setEditingId(null);
    } else {
      updated = [newRes, ...resources];
    }
    saveResources(updated);
    setResources(updated);
    setForm(emptyForm);
    setSuccess(true);
    setShowPreview(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this resource?")) return;
    const updated = resources.filter((r) => r.id !== id);
    saveResources(updated);
    setResources(updated);
  };

  const handleEdit = (res: LocalResource) => {
    setEditingId(res.id);
    setForm({
      title: res.title,
      level: res.level,
      format: res.format.charAt(0).toUpperCase() + res.format.slice(1),
      skill: res.skill.charAt(0).toUpperCase() + res.skill.slice(1),
      description: res.description,
      url: res.url,
      duration: res.duration || "",
      pages: res.pages ? String(res.pages) : "",
      tags: res.tags?.join(", ") || "",
    });
    setSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAll = () => {
    if (!confirm("Remove all locally stored resources? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setResources([]);
  };

  const Icon = FORMAT_ICONS[form.format as keyof typeof FORMAT_ICONS] || FileText;

  return (
    <Layout>
      <SEOHead title={t(editingId ? "addResource.editTitle" : "addResource.addTitle") + " â€” English With Henda"} description={t("addResource.addSubtitle")} />

      <section className="container py-12 max-w-2xl">
        <ScrollReveal>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
            {t(editingId ? "addResource.editTitle" : "addResource.addTitle")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t(editingId ? "addResource.editSubtitle" : "addResource.addSubtitle")}
          </p>
        </ScrollReveal>

        {success && (
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6">
            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm font-medium">{t(editingId ? "addResource.successUpdate" : "addResource.successSave")}</p>
          </div>
        )}

        <ScrollReveal>
          <form className="space-y-5 rounded-xl border bg-card p-6 sm:p-8 shadow-sm" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <Label htmlFor="title">{t("addResource.form.resourceTitle")} *</Label>
              <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={t("addResource.form.titlePlaceholder")} className="mt-1.5" />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
            </div>

            {/* Level + Format */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label>{t("addResource.form.level")} *</Label>
                <Select value={form.level} onValueChange={(v) => set("level", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("addResource.form.levelSelect")} /></SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => <SelectItem key={l} value={l}>{l} {t("addResource.yearLabel")}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.level && <p className="text-xs text-destructive mt-1">{errors.level}</p>}
              </div>
              <div>
                <Label>{t("addResource.form.format")} *</Label>
                <Select value={form.format} onValueChange={(v) => set("format", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("addResource.form.formatSelect")} /></SelectTrigger>
                  <SelectContent>
                    {FORMATS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.format && <p className="text-xs text-destructive mt-1">{errors.format}</p>}
              </div>
            </div>

            {/* Skill */}
            <div>
              <Label>{t("addResource.form.skill")} *</Label>
              <Select value={form.skill} onValueChange={(v) => set("skill", v)}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("addResource.form.skillSelect")} /></SelectTrigger>
                <SelectContent>
                  {SKILLS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.skill && <p className="text-xs text-destructive mt-1">{errors.skill}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="desc">{t("addResource.form.description")} *</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder={t("addResource.form.descPlaceholder")} rows={3} className="mt-1.5" />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            {/* URL */}
            <div>
              <Label htmlFor="url">{t("addResource.form.url")} *</Label>
              <Input id="url" value={form.url} onChange={(e) => set("url", e.target.value)} placeholder={t("addResource.form.urlPlaceholder")} className="mt-1.5" />
              {errors.url && <p className="text-xs text-destructive mt-1">{errors.url}</p>}
            </div>

            {/* Optional fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="duration">{t("addResource.form.duration")}</Label>
                <Input id="duration" value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder={t("addResource.form.durationPlaceholder")} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pages">{t("addResource.form.pages")}</Label>
                <Input id="pages" type="number" value={form.pages} onChange={(e) => set("pages", e.target.value)} placeholder={t("addResource.form.pagesPlaceholder")} className="mt-1.5" />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">{t("addResource.form.tags")}</Label>
              <Input id="tags" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder={t("addResource.form.tagsPlaceholder")} className="mt-1.5" />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Button type="submit" className="flex-1">
                <Plus className="me-2 h-4 w-4" />
                {t(editingId ? "addResource.updateResource" : "addResource.saveResource")}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? <EyeOff className="me-2 h-4 w-4" /> : <Eye className="me-2 h-4 w-4" />}
                {t(showPreview ? "addResource.hidePreview" : "addResource.preview")}
              </Button>
              {editingId && (
                <Button type="button" variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  {t("addResource.cancelEdit")}
                </Button>
              )}
            </div>
          </form>
        </ScrollReveal>

        {/* Live preview */}
        {showPreview && form.title && (
          <ScrollReveal>
            <div className="mt-8">
              <h3 className="font-serif text-lg font-semibold mb-3">{t("addResource.previewTitle")}</h3>
              <div className="rounded-xl border bg-card p-5 shadow-sm max-w-sm">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {form.level && <Badge className={LEVEL_BADGE[form.level] || "bg-muted"}>{form.level} {t("addResource.yearLabel")}</Badge>}
                  {form.format && <Badge variant="outline">{form.format}</Badge>}
                  {form.skill && <Badge variant="secondary">{form.skill}</Badge>}
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{form.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{form.description || "â€”"}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Manage existing resources */}
        <ScrollReveal>
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold">{t("addResource.manageTitle")} ({resources.length})</h2>
              {resources.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleClearAll}>
                  <Trash2 className="me-1 h-3 w-3" /> {t("addResource.clearAll")}
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-4">{t("addResource.manageBrowserNote")}</p>

            {resources.length === 0 ? (
              <div className="rounded-xl border bg-muted/50 p-8 text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{t("addResource.noResources")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {resources.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge className={`text-[10px] ${LEVEL_BADGE[r.level] || "bg-muted"}`}>{r.level} {t("addResource.yearLabel")}</Badge>
                        <Badge variant="outline" className="text-[10px] capitalize">{r.format}</Badge>
                      </div>
                      <p className="font-semibold text-sm truncate">{r.title}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(r)}>{t("addResource.edit")}</Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
