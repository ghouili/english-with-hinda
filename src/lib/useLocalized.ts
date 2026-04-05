import { useTranslation } from "react-i18next";
import { Book, Resource } from "./types";

export function localizeBook(book: Book, lang: string): Book {
  if (lang !== "ar") return book;
  const ar = book.translations?.ar;
  if (!ar) return book;
  return {
    ...book,
    title: ar.title ?? book.title,
    subtitle: ar.subtitle ?? book.subtitle,
    gradeLabel: ar.gradeLabel ?? book.gradeLabel,
    descriptionShort: ar.descriptionShort ?? book.descriptionShort,
    descriptionLong: ar.descriptionLong ?? book.descriptionLong,
    tableOfContents: ar.tableOfContents ?? book.tableOfContents,
    availability: ar.availability ?? book.availability,
    whatsappInquiryTemplate: ar.whatsappInquiryTemplate ?? book.whatsappInquiryTemplate,
  };
}

export function localizeResource(resource: Resource, lang: string): Resource {
  if (lang !== "ar") return resource;
  const ar = resource.translations?.ar;
  if (!ar) return resource;
  return {
    ...resource,
    title: ar.title ?? resource.title,
    summary: ar.summary ?? resource.summary,
  };
}

export function useLocalizedBook(book: Book): Book {
  const { i18n } = useTranslation();
  return localizeBook(book, i18n.language);
}

export function useLocalizedResource(resource: Resource): Resource {
  const { i18n } = useTranslation();
  return localizeResource(resource, i18n.language);
}
