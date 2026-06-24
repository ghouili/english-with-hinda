import { useTranslation } from "react-i18next";
import { mediaUrl } from "@/lib/api";
import { whatsappUrl } from "@/lib/site";

const whatsAppIcon = mediaUrl("icons/whatsappiconwhite.png");

export function WhatsAppCTA() {
  const { t } = useTranslation();
  const url = whatsappUrl(t("whatsapp.message"));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <img src={whatsAppIcon} alt="" aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
