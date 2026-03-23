import { MessageCircle } from "lucide-react";
import WahtsAppIcon from '../../assets/icons/whatsappiconwhite.png';

const WHATSAPP_NUMBER = "21692053416";
const WHATSAPP_MESSAGE = "Hello, I'd like to know more about your English books.";

export function WhatsAppCTA() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:hidden"
      aria-label="Contact us on WhatsApp"
    >
      <img src={WahtsAppIcon} alt="WhatsApp" className="h-6 w-6" />
    </a>
  );
}
