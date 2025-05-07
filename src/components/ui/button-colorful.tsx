// src/components/ui/button-colorful.tsx
"use client"; // Olay yöneticileriyle kullanılabilir diye ekleyelim

import { Button } from "./button"; // Temel butonu import et
import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react"; // İkonu import et

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    // İkonu prop olarak almak isteyebiliriz
    icon?: React.ComponentType<{className?: string}>;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    icon: Icon = ArrowUpRight, // Varsayılan ikonu ayarla
    ...props
}: ButtonColorfulProps) {
    return (
        <Button // Temel Button bileşenini kullan
            className={cn(
                "relative h-10 px-4 overflow-hidden", // Boyut ve padding
                "bg-zinc-900 dark:bg-zinc-100", // Arkaplan renkleri
                "text-white dark:text-zinc-900", // Metin renkleri (içerikten kaldırıldı)
                "transition-all duration-200",
                "group", // Hover efekti için grup
                className // Dışarıdan gelen ek sınıflar
            )}
            {...props} // Diğer button proplarını aktar (onClick, type, asChild vb.)
        >
            {/* Gradient Efekti */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500", // Gradient renkleri
                    "opacity-40 group-hover:opacity-80 dark:opacity-50 dark:group-hover:opacity-90", // Opaklık ve hover efekti
                    "blur transition-opacity duration-500" // Blur ve geçiş
                )}
            />

            {/* Asıl İçerik (Gradientin üzerinde) */}
            <div className="relative flex items-center justify-center gap-2">
                 {/* label prop'unu span içinde göster */}
                <span className="text-sm font-medium">{label}</span>
                 {/* icon prop'unu göster */}
                <Icon className="w-3.5 h-3.5" />
            </div>
        </Button>
    );
}

// İsimli export
// export { ButtonColorful } // Bu şekilde veya default olarak export edilebilir
export default ButtonColorful; // Default export daha yaygın olabilir