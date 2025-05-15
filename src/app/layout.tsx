import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import CustomNavbar  from "../components/navbars/CustomNavbar"
import { ThemeProvider } from "../components/ThemeProvider";
import Footer from "../components/Footer";
import { SparklesCore } from "../components/ui/sparkles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batuhan Semiz",
  description: "Şahsi Portfolyom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} 
        bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 
        dark:from-slate-900 dark:via-gray-900 dark:to-neutral-950 
        min-h-screen flex flex-col transition-colors duration-300`}
      >
        <SparklesCore
            id="tsparticles_background"
            background="transparent" // Body'nin gradient'i görünsün
            minSize={0.4} // Daha küçük parçacıklar
            maxSize={1.2} // Daha küçük parçacıklar
            particleDensity={60} // Daha seyrek (tüm sayfa için)
            className="fixed inset-0 -z-10 w-full h-full" // <<< Sabitlendi ve arkaya gönderildi
            particleColor="#FFFFFF" // Beyaz veya açık renkler
            speed={0.4} // Daha yavaş
        />
        <ThemeProvider
          attribute="class" // Tailwind ile kullanmak için 'class' attribute'unu kullan
          defaultTheme="dark" // Varsayılan tema dark olsun
          enableSystem
          disableTransitionOnChange
        >
        <AuthProvider>
        <CustomNavbar />
          <main className="container mx-auto px-4 pt-28 md:pt-32">
              {children}
          </main>
          <Footer/>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
