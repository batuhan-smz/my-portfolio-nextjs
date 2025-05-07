// src/app/contact/page.tsx
import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react'; // Gerekli ikonları import et

// Sayfa başlığı ve açıklaması (SEO için)
export const metadata = {
  title: 'İletişim | Batuhan Semiz Portföy', // Kendi adınızı yazın
  description: 'Benimle iletişime geçmek için bu sayfayı kullanabilirsiniz.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 lg:py-20"> {/* Ana konteyner ve padding */}
      
      {/* Sayfa Başlığı */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        İletişime Geçin 📬
      </h1>

      {/* Giriş Paragrafı */}
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 md:mb-16 max-w-2xl mx-auto">
        Aşağıdaki bilgiler aracılığıyla bana ulaşabilir veya formu kullanarak doğrudan mesaj gönderebilirsiniz. Yeni projeler, işbirliği fırsatları veya sadece bir &apos;Merhaba!&apos; demek için yazmaktan çekinmeyin.
      </p>

      {/* İki Sütunlu Yapı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* Sol Sütun: İletişim Bilgileri */}
        <div className="space-y-6 bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
            İletişim Bilgileri
          </h2>

          {/* E-posta */}
          <div className="flex items-start group">
            <Mail className="w-5 h-5 mr-3 mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">E-posta</h3>
              <a href="mailto:batuhansemiz15@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                batuhansemiz15@gmail.com
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">En hızlı iletişim yöntemi.</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-start group">
            <Linkedin className="w-5 h-5 mr-3 mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <div>
               <h3 className="font-medium text-gray-800 dark:text-white mb-1">LinkedIn</h3>
               <a href="[LINKEDIN PROFIL URL'NİZ]" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                 Profilimi Ziyaret Et
               </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Profesyonel ağım için.</p>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-start group">
            <Github className="w-5 h-5 mr-3 mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">GitHub</h3>
              <a href="[GITHUB PROFIL URL'NİZ]" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Projelerimi İncele
              </a>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Açık kaynak kodlarım.</p>
            </div>
          </div>

        </div>

        {/* Sağ Sütun: İletişim Formu */}
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow">
           <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2 dark:border-gray-700">
             Mesaj Gönderin
           </h2>

           {/* --- ÖNEMLİ NOT ---
               Aşağıdaki form şu anda sadece görsel bir tasarımdır.
               'Gönder' butonuna basıldığında mesajın size ulaşması için
               ekstra bir kurulum yapmanız gerekir. Seçenekler:
               1. Backend API'nize formu işleyecek bir endpoint eklemek (/api/contact gibi).
               2. Formspree (formspree.io), Getform, Netlify Forms gibi üçüncü parti
                  form yönetim servislerini kullanmak (Genellikle en kolayı budur).
               3. Next.js içinde bir Route Handler (API Route) oluşturup oradan
                  e-posta gönderme servisi (Resend, SendGrid vb.) kullanmak.
               Formun 'action' ve 'method' özelliklerini seçeceğiniz yönteme göre
               güncellemeniz veya onSubmit ile JavaScript ile yönetmeniz gerekecektir.
           */}
           <form action="https://formspree.io/f/xanojolv" method="POST" className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adınız Soyadınız</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
                  placeholder="İsminiz"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta Adresiniz</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
                  placeholder="email@adresiniz.com"
                />
              </div>
              <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mesajınız</label>
                 <textarea
                   id="message"
                   name="message"
                   rows={5} // Biraz daha geniş
                   required
                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
                   placeholder="Mesajınızı buraya yazabilirsiniz..."
                 />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                  Gönder
                </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}