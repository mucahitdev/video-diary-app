import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface VideoEntry {
  id: string;
  name: string;
  description: string;
  uri: string;
  createdAt: string;
}

interface VideoStore {
  videos: VideoEntry[];
  addVideo: (video: Omit<VideoEntry, 'id' | 'createdAt'>) => void;
  updateVideo: (id: string, updates: Partial<VideoEntry>) => void;
  deleteVideo: (id: string) => void;
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videos: [],
      addVideo: (video) =>
        set((state) => ({
          videos: [
            ...state.videos,
            {
              ...video,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateVideo: (id, updates) =>
        set((state) => ({
          videos: state.videos.map((video) => (video.id === id ? { ...video, ...updates } : video)),
        })),
      deleteVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((video) => video.id !== id),
        })),
    }),
    {
      name: 'video-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
