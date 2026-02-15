import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "21600000000";
const WHATSAPP_MESSAGE = "Bonjour, je souhaite des informations sur vos livres d'anglais.";

export function WhatsAppCTA() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:hidden"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
