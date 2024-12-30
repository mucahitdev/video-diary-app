export interface VideoEntry {
  id: string;
  name: string;
  description: string;
  uri: string;
  createdAt: string;
}

export type VideoMetadata = {
  name: string;
  description: string;
};

export type VideoFormData = VideoMetadata;

export type Step = 'select' | 'crop' | 'metadata';
