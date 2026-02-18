const STORAGE_KEY = "ewh_resources_v1";

export interface LocalResource {
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

export function getLocalResources(): LocalResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
