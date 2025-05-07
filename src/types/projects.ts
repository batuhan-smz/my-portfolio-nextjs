// src/types/project.ts (Yeni dosya örneği)

import { Timestamp } from 'firebase/firestore';

export interface IProject {
    id: string;
    title: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
    projectUrl?: string;
    repoUrl?: string;
    createdAt?: Timestamp | null;
    updatedAt?: Timestamp | null;
  }