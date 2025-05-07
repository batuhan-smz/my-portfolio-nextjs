// src/types/project.ts (Yeni dosya örneği)
export interface IProject {
    id: string;
    title: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
    projectUrl?: string;
    repoUrl?: string;
    createdAt?: any; // Veya daha spesifik bir tip
    updatedAt?: any;
  }