// src/app/contact/page.tsx
import React from 'react';

// İletişim sayfasının içeriği
export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">İletişim</h1>
      <p className="mb-4">
        Benimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz veya formu doldurabilirsiniz (form ileride eklenecek).
      </p>
      {/* Buraya iletişim bilgileri (email vb.) veya bir form eklenebilir */}
      <p>
        Email: <a href="mailto:senin-emailin@example.com" className="text-blue-600 hover:underline">senin-emailin@example.com</a>
      </p>
    </div>
  );
}

// İsteğe bağlı: Sayfa başlığını ayarlamak için metadata
export const metadata = {
  title: 'İletişim | Portföyüm',
  description: 'Benimle iletişime geçin.',
};