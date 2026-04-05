import WahtsAppIcon from '../../assets/icons/whatsappiconwhite.png';
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "21692053416";

export function WhatsAppCTA() {
  const { t } = useTranslation();
  const message = t("whatsapp.message");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)};`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:hidden"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <img src={WahtsAppIcon} alt="WhatsApp" className="h-6 w-6" />
    </a>
  );
}
