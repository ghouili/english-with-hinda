export type Grade = 5 | 6 | 7 | 8 | 9;

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  grade: Grade;
  gradeLabelFr: string;
  coverImage: string;
  galleryImages: string[];
  descriptionShort: string;
  descriptionLong: string;
  skills: string[];
  tableOfContents: string[];
  numberOfPages: number;
  edition: string;
  publicationYear: number;
  isbn?: string;
  priceTnd?: number;
  availability?: string;
  stockistIds: string[];
  whatsappInquiryTemplate: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

export interface Stockist {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  mapUrl: string;
  hours: string;
  notes: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  grade: Grade;
  skill: string;
  format: "pdf" | "audio" | "article";
  summary: string;
  fileUrl: string;
  relatedBookIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  gradeOptional?: Grade;
  content: string;
  authorName: string;
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

export const GRADE_CONFIG: Record<Grade, { label: string; color: string; slug: string }> = {
  5: { label: "5ème", color: "grade-5", slug: "5eme" },
  6: { label: "6ème", color: "grade-6", slug: "6eme" },
  7: { label: "7ème", color: "grade-7", slug: "7eme" },
  8: { label: "8ème", color: "grade-8", slug: "8eme" },
  9: { label: "9ème", color: "grade-9", slug: "9eme" },
};
