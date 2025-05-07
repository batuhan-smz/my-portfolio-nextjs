// src/services/projectService.ts
import axios from 'axios';
import { IProject } from '../types/projects';

// Proje verisinin yapısını tanımlayan Interface
// Backend'den gelen alanlarla eşleştiğinden emin olun


// API'nin temel URL'sini .env dosyasından alalım
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API Base URL is not defined. Check your .env file and VITE_API_BASE_URL variable.");
}

// Tekrar tekrar kullanmak için yapılandırılmış bir Axios örneği oluşturabiliriz
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----- API Fonksiyonları -----

/**
 * Backend API'den tüm projeleri getirir.
 * @returns Promise<IProject[]> - Proje dizisi içeren bir Promise.
 */
export const getProjects = async (): Promise<IProject[]> => {
  try {
    console.log("SERVICE: Fetching projects..."); // Log 1
    const response = await apiClient.get<IProject[]>('/projects');
    console.log("SERVICE: API Response Status:", response.status); // Log 2
    console.log("SERVICE: API Response Data:", response.data); // Log 3 <<< API'den gelen ham veri

    // Dönen verinin dizi olup olmadığını KONTROL ET
    if (!Array.isArray(response.data)) {
        console.error("SERVICE: API'den dönen veri bir dizi DEĞİL!", response.data);
        // Hata durumunda boş dizi döndürerek .map hatasını önle
        return [];
    }
    return response.data; // Sadece verinin dizi olduğundan eminsek döndür
  } catch (error) {
    console.error("SERVICE: Error fetching projects:", error);
    // throw error; // Hatayı yukarı fırlatabiliriz veya boş dizi dönebiliriz
    return []; // Hata durumunda da boş dizi döndürerek .map hatasını önle
  }
};

/**
 * Belirli bir ID'ye sahip projeyi getirir.
 * @param id Proje ID'si
 * @returns Promise<IProject | null> - Projeyi veya bulunamazsa null içeren bir Promise.
 */
export const getProjectById = async (id: string): Promise<IProject | null> => {
    try {
        const response = await apiClient.get<IProject>(`/projects/${id}`);
        return response.data;
    } catch (error: any) { // Axios hatalarını daha iyi yakalamak için any veya AxiosError kullanabiliriz
        if (error.response && error.response.status === 404) {
            console.warn(`Project with id ${id} not found.`);
            return null;
        }
        console.error(`Error fetching project ${id}:`, error);
        throw error; // Diğer hataları yeniden fırlat
    }
};


// ----- İleride Eklenecek Korumalı Fonksiyonlar (Taslak) -----

/**
 * Yeni bir proje oluşturur. (Kimlik Doğrulama Gerekir)
 * @param projectData Proje bilgileri (id ve timestamp'ler hariç)
 * @param token Yetkilendirme token'ı (Firebase ID Token)
 * @returns Promise<IProject> - Oluşturulan proje bilgisini içeren Promise.
 */
export const createProject = async (projectData: Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<IProject> => {
  try {
    const response = await apiClient.post<IProject>('/projects', projectData, {
      headers: {
        // Token'ı Authorization başlığına ekliyoruz
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project in service:", error);
    throw error; // Hatayı bileşenin yakalaması için yeniden fırlat
  }
};

/**
 * Mevcut bir projeyi günceller. (Kimlik Doğrulama Gerekir)
 * @param id Güncellenecek proje ID'si
 * @param projectData Güncellenecek proje bilgileri (kısmi olabilir)
 * @param token Yetkilendirme token'ı
 * @returns Promise<IProject> - Güncellenen proje bilgisini içeren Promise.
 */
export const updateProject = async (id: string, projectData: Partial<Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>>, token: string): Promise<IProject> => {
   try {
       const response = await apiClient.put<IProject>(`/projects/${id}`, projectData, {
           headers: { Authorization: `Bearer ${token}` } // Token eklendi
       });
       return response.data;
   } catch (error) {
       console.error(`Error updating project ${id} in service:`, error);
       throw error;
   }
};

/**
 * Bir projeyi siler. (Kimlik Doğrulama Gerekir)
 * @param id Silinecek proje ID'si
 * @param token Yetkilendirme token'ı
 * @returns Promise<void>
 */
export const deleteProject = async (id: string, token: string): Promise<void> => {
   try {
       await apiClient.delete(`/projects/${id}`, {
           headers: { Authorization: `Bearer ${token}` } // Token eklendi
       });
       console.log(`Project ${id} deleted successfully via service.`);
   } catch (error) {
       console.error(`Error deleting project ${id} in service:`, error);
       throw error;
   }
};