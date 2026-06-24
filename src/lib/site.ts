// Central contact configuration. Keep all phone / WhatsApp values here so they
// never drift out of sync across the header, footer, contact page and CTAs.
export const SITE = {
  whatsappNumber: "21692053416", // international format, no '+' (for wa.me)
  phoneTel: "+21692053416", // for tel: links
  phoneDisplay: "+216 92 053 416", // human-readable
} as const;

/** Build a wa.me link, optionally pre-filling a chat message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
