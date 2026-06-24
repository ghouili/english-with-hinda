const BASE = (import.meta.env.VITE_API_URL as string) || '';

export const apiUrl = (path: string) => `${BASE}/api/${path}`;
export const mediaUrl = (path: string) => `${BASE}/media/${path}`;

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(apiUrl('auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed.');
  }
  return res.json() as Promise<{ token: string; role: string }>;
}

// ── Resources ─────────────────────────────────────────────────────────────────

export async function fetchResources() {
  const res = await fetch(apiUrl('resources'));
  if (!res.ok) throw new Error('Failed to load resources.');
  return res.json();
}

export async function fetchResourceBySlug(slug: string) {
  const res = await fetch(apiUrl(`resources/${slug}`));
  if (!res.ok) throw new Error('Resource not found.');
  return res.json();
}

export async function createResource(formData: FormData, token: string) {
  const res = await fetch(apiUrl('resources'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create resource.');
  }
  return res.json();
}

export async function updateResource(id: string, formData: FormData, token: string) {
  const res = await fetch(apiUrl(`resources/${id}`), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update resource.');
  }
  return res.json();
}

export async function deleteResource(id: string, token: string) {
  const res = await fetch(apiUrl(`resources/${id}`), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete resource.');
  }
  return res.json();
}
