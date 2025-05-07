"use client";
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; // Firebase User tipi ve fonksiyonları
import { auth } from '../config/firebaseConfig'; // Firebase auth örneğimiz

// Context'in sağlayacağı değerlerin tip tanımı
interface AuthContextType {
  currentUser: User | null; // Giriş yapmış kullanıcı bilgisi veya null
  loading: boolean;         // Kimlik durumu kontrol edilirken yüklenme durumu
  logout: () => Promise<void>; // Çıkış yapma fonksiyonu
}

// Context'i oluşturma (başlangıç değeri undefined olabilir)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context'i kolayca kullanmak için özel hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider'); // Provider dışında kullanılırsa hata ver
  }
  return context;
};

// Provider Bileşeni
interface AuthProviderProps {
  children: ReactNode; // Provider'ın saracağı bileşenler
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Başlangıçta kimlik durumu kontrol edilirken true olacak
  const [loading, setLoading] = useState<boolean>(true);

  // Bileşen mount edildiğinde Firebase kimlik durumu dinleyicisini başlat
  useEffect(() => {
    // onAuthStateChanged, kullanıcı giriş/çıkış yaptığında tetiklenir
    // ve ilk yüklendiğinde mevcut durumu kontrol eder.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Gelen kullanıcı bilgisini (veya null) state'e ata
      setLoading(false); // Kimlik kontrolü tamamlandı, yüklemeyi bitir
      console.log("Auth State Changed. Current User:", user ? user.uid : null);
    });

    // Bileşen unmount edildiğinde dinleyiciyi temizle (memory leak önler)
    return unsubscribe;
  }, []); // Boş dependency array, sadece mount/unmount'ta çalışır

  // Çıkış yapma fonksiyonu
  const logout = async () => {
    try {
      await signOut(auth); // Firebase'den çıkış yap
    } catch (error) {
      console.error("Error signing out:", error);
      // İsteğe bağlı: Kullanıcıya hata mesajı gösterilebilir
    }
  };

  // Context aracılığıyla paylaşılacak değerler
  const value: AuthContextType = {
    currentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children} {/* <<< Koşullu render'ı kaldır, çocukları hep render et */}
    </AuthContext.Provider>
  );
};