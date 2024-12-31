import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useVideoOperations } from '../../hooks/useVideoOperations';
import { VideoPlayer } from '../VideoPlayer';

interface VideoCropStepProps {
  videoUri: string;
  videoDuration: number | null | undefined;
  onCrop: (croppedUri: string) => void;
}

export function VideoCropStep({ videoUri, videoDuration, onCrop }: VideoCropStepProps) {
  const [startTime, setStartTime] = useState(0);
  const { cropVideo, isCropping } = useVideoOperations();

  // Convert milliseconds to seconds
  const durationInSeconds = videoDuration ? videoDuration / 1000 : 0;
  const isTooShort = durationInSeconds <= 5;
  const maxSliderValue = Math.max(0, durationInSeconds - 5);

  const handleCrop = async () => {
    try {
      const outputUri = await cropVideo({
        sourceUri: videoUri,
        startTime,
        duration: !isTooShort ? 5 : 0,
      });
      onCrop(outputUri);
    } catch (error) {
      console.error('Error cropping video:', error);
      alert('Failed to crop video. Please try again.');
    }
  };

  return (
    <View className="flex-1">
      <VideoPlayer uri={videoUri} />
      <View className="mt-4 px-4">
        {!isTooShort && (
          <>
            <Text className="mb-2 text-center text-gray-600">
              Select start time: {startTime.toFixed(1)}s
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={maxSliderValue}
              value={startTime}
              onValueChange={setStartTime}
              minimumTrackTintColor="#0284c7"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#0284c7"
            />
          </>
        )}
      </View>
      <View className="mt-4 items-center gap-4 space-y-2">
        {isCropping ? (
          <ActivityIndicator size="large" color="#0284c7" />
        ) : (
          <>
            <TouchableOpacity
              onPress={handleCrop}
              className={`rounded-lg px-6 py-3 ${isTooShort ? 'bg-gray-400' : 'bg-blue-500'}`}
              disabled={isTooShort}>
              <Text className="font-semibold text-white">
                {isTooShort
                  ? 'Video must be longer than 5 seconds'
                  : `Crop 5 Seconds (Starting at ${startTime.toFixed(1)}s)`}
              </Text>
            </TouchableOpacity>
            {isTooShort && (
              <TouchableOpacity
                onPress={() => onCrop(videoUri)}
                className="rounded-lg bg-blue-500 px-6 py-3">
                <Text className="font-semibold text-white">Skip Cropping</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}
