import { View } from 'react-native';

import { VideoFormData } from '../../types/video';
import { VideoMetadataForm } from '../VideoMetadataForm';
import { VideoPlayer } from '../VideoPlayer';

interface VideoMetadataStepProps {
  videoUri: string;
  onSave: (metadata: VideoFormData) => void;
}

export function VideoMetadataStep({ videoUri, onSave }: VideoMetadataStepProps) {
  return (
    <View className="flex-1">
      <VideoPlayer uri={videoUri} />
      <VideoMetadataForm onSubmit={onSave} />
    </View>
  );
}
