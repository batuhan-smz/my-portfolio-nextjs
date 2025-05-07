// src/services/projectService.ts
import axios, { AxiosError } from 'axios'; // <<< AxiosError import edildi
import { IProject } from '../types/projects'; // <<< Alias ile import (yolu kontrol et)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API Base URL tanımlanmamış. .env.local dosyasını ve NEXT_PUBLIC_API_BASE_URL değişkenini kontrol et.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----- API Fonksiyonları -----

export const getProjects = async (): Promise<IProject[]> => {
  try {
    console.log("SERVICE: Projeler çekiliyor...");
    const response = await apiClient.get<IProject[]>('/projects');
    console.log("SERVICE: API Yanıt Durumu:", response.status);
    // console.log("SERVICE: API Yanıt Verisi:", response.data); // Gerekirse logu aç

    if (!Array.isArray(response.data)) {
        console.error("SERVICE (getProjects): API'den dönen veri bir dizi DEĞİL!", response.data);
        return [];
    }
    return response.data;
  } catch (error: unknown) { // <<< any yerine unknown
    console.error("SERVICE (getProjects): Projeler çekilirken hata:", error);
    // Hata detayını loglamak için tip kontrolü
    if (axios.isAxiosError(error)) {
        console.error("Axios Hatası Detayı:", error.response?.data || error.message);
    } else if (error instanceof Error) {
        console.error("Genel Hata:", error.message);
    }
    return [];
  }
};

export const getProjectById = async (id: string): Promise<IProject | null> => {
    try {
        const response = await apiClient.get<IProject>(`/projects/${id}`);
        return response.data;
    } catch (error: unknown) { // <<< any yerine unknown
        if (axios.isAxiosError(error)) { // Axios hatası mı kontrol et
            const axiosError = error as AxiosError; // Tipi kesinleştir
            if (axiosError.response && axiosError.response.status === 404) {
                console.warn(`SERVICE (getProjectById): ${id} ID'li proje bulunamadı.`);
                return null;
            }
            console.error(`SERVICE (getProjectById): Proje ${id} çekilirken Axios hatası:`, axiosError.message);
        } else if (error instanceof Error) {
             console.error(`SERVICE (getProjectById): Proje ${id} çekilirken genel hata:`, error.message);
        } else {
            console.error(`SERVICE (getProjectById): Proje ${id} çekilirken bilinmeyen hata:`, error);
        }
        throw error; // Hatayı yukarı fırlat veya null döndür
    }
};

export const createProject = async (projectData: Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<IProject> => {
  try {
    const response = await apiClient.post<IProject>('/projects', projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) { // <<< any yerine unknown
    console.error("SERVICE (createProject): Proje oluşturulurken hata:", error);
    if (axios.isAxiosError(error)) {
        console.error("Axios Hatası Detayı:", error.response?.data || error.message);
    } else if (error instanceof Error) {
        console.error("Genel Hata:", error.message);
    }
    throw error;
  }
};

export const updateProject = async (id: string, projectData: Partial<Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>>, token: string): Promise<IProject> => {
   try {
       const response = await apiClient.put<IProject>(`/projects/${id}`, projectData, {
           headers: { Authorization: `Bearer ${token}` }
       });
       return response.data;
   } catch (error: unknown) { // <<< any yerine unknown
       console.error(`SERVICE (updateProject ${id}): Proje güncellenirken hata:`, error);
       if (axios.isAxiosError(error)) {
           console.error("Axios Hatası Detayı:", error.response?.data || error.message);
       } else if (error instanceof Error) {
           console.error("Genel Hata:", error.message);
       }
       throw error;
   }
};

export const deleteProject = async (id: string, token: string): Promise<void> => {
   try {
       await apiClient.delete(`/projects/${id}`, {
           headers: { Authorization: `Bearer ${token}` }
       });
       console.log(`SERVICE (deleteProject): Proje ${id} başarıyla silindi.`);
   } catch (error: unknown) { // <<< any yerine unknown
       console.error(`SERVICE (deleteProject ${id}): Proje silinirken hata:`, error);
       if (axios.isAxiosError(error)) {
           console.error("Axios Hatası Detayı:", error.response?.data || error.message);
       } else if (error instanceof Error) {
           console.error("Genel Hata:", error.message);
       }
       throw error;
   }
};