import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  Headphones,
  Upload,
  X,
  CheckCircle,
  Music,
  BarChart3,
  ExternalLink,
  QrCode,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
} from "@/lib/api";

const GRADES = [4, 5, 6, 7, 8, 9] as const;

const GRADE_BADGE: Record<number, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const BOOK_IDS = [
  "learn-english-with-henda-4th",
  "learn-english-with-henda-5th",
  "learn-english-with-henda-6th",
  "learn-english-with-henda-7th",
  "learn-english-with-henda-8th",
  "learn-english-with-henda-9th",
];

type AudioItem = { fileName: string; originalName: string; url: string };

interface Resource {
  id: string;
  slug: string;
  title: string;
  grade: number;
  format: string;
  summary: string;
  pageNumber: number | null;
  audios: AudioItem[];
  relatedBookIds: string[];
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  title: "",
  slug: "",
  grade: "5",
  summary: "",
  pageNumber: "",
  relatedBookIds: [] as string[],
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Admin() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Resource | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [newAudios, setNewAudios] = useState<File[]>([]);
  const [keptAudios, setKeptAudios] = useState<AudioItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [qrTarget, setQrTarget] = useState<Resource | null>(null);
  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchResources();
      setResources(data);
    } catch {
      setError("Failed to load resources. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const resourceUrl = (slug: string) => `https://learnenglish.tn/resources/${slug}`;

  const downloadQR = useCallback((slug: string) => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-${slug}.png`;
    link.click();
  }, []);

  const copyUrl = useCallback(async (slug: string) => {
    await navigator.clipboard.writeText(resourceUrl(slug));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setNewAudios([]);
    setKeptAudios([]);
    setFormError("");
    setDialogOpen(true);
  };

  const openEdit = (r: Resource) => {
    setEditTarget(r);
    setForm({
      title: r.title,
      slug: r.slug,
      grade: String(r.grade),
      summary: r.summary,
      pageNumber: r.pageNumber != null ? String(r.pageNumber) : "",
      relatedBookIds: r.relatedBookIds || [],
    });
    setNewAudios([]);
    setKeptAudios(r.audios || []);
    setFormError("");
    setDialogOpen(true);
  };

  const set = (key: keyof typeof emptyForm, value: string | boolean | string[]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "title" && !editTarget) {
      setForm((f) => ({ ...f, slug: slugify(value as string) }));
    }
  };

  const toggleBook = (id: string) => {
    setForm((f) => ({
      ...f,
      relatedBookIds: f.relatedBookIds.includes(id)
        ? f.relatedBookIds.filter((b) => b !== id)
        : [...f.relatedBookIds, id],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.title || !form.slug || !form.summary) {
      setFormError("Title, slug, and summary are required.");
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("grade", form.grade);
      fd.append("format", "audio");
      fd.append("summary", form.summary);
      fd.append("pageNumber", form.pageNumber);
      fd.append("relatedBookIds", JSON.stringify(form.relatedBookIds));
      // Multi-audio: list of existing files to keep + any newly chosen files to upload.
      fd.append("keepAudio", JSON.stringify(keptAudios.map((a) => a.fileName)));
      newAudios.forEach((f) => fd.append("audio", f));

      if (editTarget) {
        const updated = await updateResource(editTarget.id, fd, token!);
        setResources((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
        showToast("Resource updated successfully.");
      } else {
        const created = await createResource(fd, token!);
        setResources((prev) => [created, ...prev]);
        showToast("Resource created successfully.");
      }

      setDialogOpen(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteResource(deleteTarget.id, token!);
      setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      showToast("Resource deleted.");
    } catch {
      showToast("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const withAudio = resources.filter((r) => r.audios && r.audios.length > 0).length;
  const withoutAudio = resources.length - withAudio;

  return (
    <>
      <SEOHead title="Admin — English With Henda" description="Admin dashboard" />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-4 py-3 shadow-lg text-sm font-medium">
          <CheckCircle className="h-4 w-4 text-primary" />
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-muted/30">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img src="/new-logo.png" alt="EWH" className="h-8 w-auto" />
              </Link>
              <span className="hidden sm:inline text-muted-foreground">/</span>
              <span className="hidden sm:inline font-semibold text-sm">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="me-1 h-3.5 w-3.5" /> View Site
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="me-1 h-3.5 w-3.5" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-8 max-w-6xl">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resources.length}</p>
                <p className="text-sm text-muted-foreground">Total resources</p>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-500/10">
                <Music className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{withAudio}</p>
                <p className="text-sm text-muted-foreground">With audio</p>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10">
                <Headphones className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{withoutAudio}</p>
                <p className="text-sm text-muted-foreground">No audio yet</p>
              </div>
            </div>
          </div>

          {/* Resource list header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-serif text-2xl font-bold">Resources</h1>
            <Button onClick={openCreate}>
              <Plus className="me-1.5 h-4 w-4" /> Add Resource
            </Button>
          </div>

          {loading && (
            <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
              Loading resources…
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && resources.length === 0 && (
            <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
              No resources yet. Click "Add Resource" to create one.
            </div>
          )}

          {!loading && !error && resources.length > 0 && (
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-start px-4 py-3 font-medium text-muted-foreground">Title</th>
                      <th className="text-start px-4 py-3 font-medium text-muted-foreground">Grade</th>
                      <th className="text-center px-4 py-3 font-medium text-muted-foreground">Page</th>
                      <th className="text-center px-4 py-3 font-medium text-muted-foreground">Audio</th>
                      <th className="text-center px-4 py-3 font-medium text-muted-foreground">QR</th>
                      <th className="text-end px-4 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {resources.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium leading-tight">{r.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{r.slug}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`text-xs ${GRADE_BADGE[r.grade]}`}>
                            {r.grade}th Year
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.pageNumber != null ? (
                            <span className="text-sm">p. {r.pageNumber}</span>
                          ) : (
                            <span className="text-muted-foreground/50 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.audios && r.audios.length > 0 ? (
                            <span className="inline-flex items-center justify-center gap-1 text-green-600 text-xs">
                              <Music className="h-3.5 w-3.5" /> {r.audios.length}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/50 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2"
                            title="View QR code"
                            onClick={() => { setCopied(false); setQrTarget(r); }}
                          >
                            <QrCode className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={() => openEdit(r)}
                            >
                              <Pencil className="h-3.5 w-3.5 me-1" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                              onClick={() => setDeleteTarget(r)}
                            >
                              <Trash2 className="h-3.5 w-3.5 me-1" /> Delete
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" asChild>
                              <Link to={`/resources/${r.slug}`} target="_blank">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editTarget ? "Edit Resource" : "Add Resource"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5 pt-2">
            {formError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {formError}
              </div>
            )}

            {/* Title + Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="f-title">Title *</Label>
                <Input
                  id="f-title"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Grammar — Present Simple"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="f-slug">Slug *</Label>
                <Input
                  id="f-slug"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="grammar-present-simple-5th"
                  className="mt-1.5 font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* Grade + Page number */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Grade *</Label>
                <Select value={form.grade} onValueChange={(v) => set("grade", v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((g) => (
                      <SelectItem key={g} value={String(g)}>
                        {g}th Year
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="f-page">Page number in the book</Label>
                <Input
                  id="f-page"
                  type="number"
                  min={1}
                  value={form.pageNumber}
                  onChange={(e) => set("pageNumber", e.target.value)}
                  placeholder="e.g. 12"
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <Label htmlFor="f-summary">Summary *</Label>
              <Textarea
                id="f-summary"
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder="Audio lesson on…"
                rows={3}
                className="mt-1.5"
                required
              />
            </div>

            {/* Related books */}
            <div>
              <Label className="mb-2 block">Related Books</Label>
              <div className="flex flex-wrap gap-2">
                {BOOK_IDS.map((id) => {
                  const grade = id.match(/(\d+)th/)?.[1];
                  const active = form.relatedBookIds.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleBook(id)}
                      className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {grade}th Year
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio files (multiple) */}
            <div>
              <Label>Audio files</Label>

              {/* Existing audios kept on this resource (edit mode) */}
              {keptAudios.length > 0 && (
                <ul className="mt-1.5 space-y-1.5">
                  {keptAudios.map((a) => (
                    <li
                      key={a.fileName}
                      className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2"
                    >
                      <Music className="h-4 w-4 text-green-600 shrink-0" />
                      <span className="text-xs text-muted-foreground flex-1 truncate">
                        {a.originalName || a.fileName}
                      </span>
                      <button
                        type="button"
                        title="Remove this audio"
                        onClick={() =>
                          setKeptAudios((prev) => prev.filter((x) => x.fileName !== a.fileName))
                        }
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Newly chosen files (uploaded on save) */}
              {newAudios.length > 0 && (
                <ul className="mt-1.5 space-y-1.5">
                  {newAudios.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2"
                    >
                      <Upload className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-xs flex-1 truncate">{f.name}</span>
                      <button
                        type="button"
                        title="Remove"
                        onClick={() => setNewAudios((prev) => prev.filter((_, j) => j !== i))}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".mp3,.wav,.ogg,.m4a,.aac,.flac,.opus"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length) setNewAudios((prev) => [...prev, ...files]);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="me-2 h-3.5 w-3.5" /> Add audio files
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add as many as you need. Accepted: mp3, wav, ogg, m4a, aac, flac, opus. Max 200 MB each.
                </p>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : editTarget ? "Save Changes" : "Create Resource"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={!!qrTarget} onOpenChange={(o) => !o && setQrTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg">QR Code</DialogTitle>
          </DialogHeader>

          {qrTarget && (
            <div className="flex flex-col items-center gap-5 py-2">
              {/* QR canvas — higher resolution for print quality */}
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <QRCodeCanvas
                  id="qr-canvas"
                  value={resourceUrl(qrTarget.slug)}
                  size={240}
                  marginSize={2}
                  level="H"
                  fgColor="#000000"
                  bgColor="transparent"
                />
              </div>

              {/* Resource info */}
              <div className="w-full text-center">
                <p className="font-semibold text-sm">{qrTarget.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 break-all">
                  {resourceUrl(qrTarget.slug)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1"
                  onClick={() => downloadQR(qrTarget.slug)}
                >
                  <Download className="me-2 h-4 w-4" /> Download PNG
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyUrl(qrTarget.slug)}
                >
                  {copied
                    ? <><Check className="me-2 h-4 w-4 text-green-500" /> Copied!</>
                    : <><Copy className="me-2 h-4 w-4" /> Copy URL</>
                  }
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Downloads as a transparent PNG — print or place it on any background. It links directly to the audio resource.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold">{deleteTarget?.title}</span>
              {deleteTarget?.audios && deleteTarget.audios.length > 0 && " and its audio files"}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
