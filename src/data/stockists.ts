import { Stockist } from "@/lib/types";

export const stockists: Stockist[] = [
  { id: "s1", name: "Librairie Al-Kitab", city: "Tunis", address: "23 Avenue Habib Bourguiba, Tunis 1000", phone: "+216 71 123 456", mapUrl: "https://maps.google.com/?q=Tunis", hours: "Lun-Sam 8h-18h", notes: "Grande sélection de manuels scolaires" },
  { id: "s2", name: "Papeterie Centrale", city: "Tunis", address: "15 Rue de la Liberté, Tunis 1000", phone: "+216 71 234 567", mapUrl: "https://maps.google.com/?q=Tunis", hours: "Lun-Sam 9h-19h", notes: "" },
  { id: "s3", name: "Librairie Maarifa", city: "Ariana", address: "Avenue de l'Indépendance, Ariana 2080", phone: "+216 71 345 678", mapUrl: "https://maps.google.com/?q=Ariana+Tunisia", hours: "Lun-Sam 8h30-17h30", notes: "" },
  { id: "s4", name: "Espace du Livre", city: "Sfax", address: "Rue Commandant Béjaoui, Sfax 3000", phone: "+216 74 456 789", mapUrl: "https://maps.google.com/?q=Sfax+Tunisia", hours: "Lun-Sam 8h-18h", notes: "Livraison disponible en ville" },
  { id: "s5", name: "Librairie Horizons", city: "Sousse", address: "Boulevard du 14 Janvier, Sousse 4000", phone: "+216 73 567 890", mapUrl: "https://maps.google.com/?q=Sousse+Tunisia", hours: "Lun-Sam 9h-18h", notes: "" },
  { id: "s6", name: "Librairie El Amel", city: "Monastir", address: "Avenue Habib Bourguiba, Monastir 5000", phone: "+216 73 678 901", mapUrl: "https://maps.google.com/?q=Monastir+Tunisia", hours: "Lun-Sam 8h-17h", notes: "" },
  { id: "s7", name: "Papeterie du Savoir", city: "Bizerte", address: "Rue du 1er Juin, Bizerte 7000", phone: "+216 72 789 012", mapUrl: "https://maps.google.com/?q=Bizerte+Tunisia", hours: "Lun-Sam 8h30-18h", notes: "" },
  { id: "s8", name: "Librairie Culturelle", city: "Nabeul", address: "Avenue Taieb Mehiri, Nabeul 8000", phone: "+216 72 890 123", mapUrl: "https://maps.google.com/?q=Nabeul+Tunisia", hours: "Lun-Sam 9h-17h30", notes: "" },
  { id: "s9", name: "Librairie Ibn Khaldoun", city: "Kairouan", address: "Avenue de la République, Kairouan 3100", phone: "+216 77 901 234", mapUrl: "https://maps.google.com/?q=Kairouan+Tunisia", hours: "Lun-Sam 8h-17h", notes: "" },
  { id: "s10", name: "Librairie Carthage", city: "La Marsa", address: "Rue du Lac, La Marsa 2078", phone: "+216 71 012 345", mapUrl: "https://maps.google.com/?q=La+Marsa+Tunisia", hours: "Lun-Sam 9h-19h", notes: "Parking disponible" },
];

export function getStockistsByCity(city: string): Stockist[] {
  return stockists.filter((s) => s.city === city);
}

export function getUniqueCities(): string[] {
  return [...new Set(stockists.map((s) => s.city))];
}
