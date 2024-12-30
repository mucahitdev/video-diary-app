import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useVideoOperations } from '../../hooks/useVideoOperations';
import { VideoPlayer } from '../VideoPlayer';

interface VideoCropStepProps {
  videoUri: string;
  onCrop: (croppedUri: string) => void;
}

export function VideoCropStep({ videoUri, onCrop }: VideoCropStepProps) {
  const { cropVideo, isCropping } = useVideoOperations();

  const handleCrop = async () => {
    try {
      const outputUri = await cropVideo({ sourceUri: videoUri });
      onCrop(outputUri);
    } catch (error) {
      console.error('Error cropping video:', error);
      alert('Failed to crop video. Please try again.');
    }
  };

  return (
    <View className="flex-1">
      <VideoPlayer uri={videoUri} />
      <View className="mt-4 items-center">
        {isCropping ? (
          <ActivityIndicator size="large" color="#0284c7" />
        ) : (
          <TouchableOpacity onPress={handleCrop} className="rounded-lg bg-blue-500 px-6 py-3">
            <Text className="font-semibold text-white">Crop First 5 Seconds</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
