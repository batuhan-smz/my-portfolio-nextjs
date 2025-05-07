// src/components/ui/LoadingSpinner.tsx
"use client"; // Bu bileşen state veya hook kullanmıyor ama client'ta render edilecek

import { Loader2 } from 'lucide-react'; // lucide-react'tan dönen yükleme ikonunu import et
import { cn } from '../../lib/utils'; // cn fonksiyonu (Tailwind sınıflarını birleştirmek için)

interface LoadingSpinnerProps {
  className?: string;
  size?: number; // İkonun boyutunu ayarlamak için (opsiyonel)
  text?: string; // İkonun yanında gösterilecek yazı (opsiyonel)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 48, // Varsayılan boyut 48px
  text = "Yükleniyor...", // Varsayılan yazı
}) => {
  return (
    // Flex container ile ikonu ve yazıyı ortala
    <div className={cn("flex flex-col justify-center items-center w-full h-full py-10", className)}>
      <Loader2
        className="animate-spin text-blue-600 dark:text-blue-400" // Tailwind animate-spin ve renk sınıfları
        style={{ width: size, height: size }} // Dinamik boyut
      />
      {text && ( // Sadece text prop'u varsa göster
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;