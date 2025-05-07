// src/types/navigation.ts (Yeni Dosya)
import { LucideIcon } from 'lucide-react';

// Bu tip sadece CustomNavbar'ın proje linkleri için gerekli olacak gibi duruyor.
// Statik linkler için belki ayrı bir tipe gerek yok.
// Şimdilik proje linkleri için kullanacağımız haliyle bırakalım.
export interface NavItem {
  id: string;
  name: string; // Proje başlığı olacak
  url: string; // '#project-id' formatında olacak
  icon: LucideIcon; // Projeler için genel bir ikon olabilir
}