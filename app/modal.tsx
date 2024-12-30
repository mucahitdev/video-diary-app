import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { VideoCropStep } from '../components/steps/VideoCropStep';
import { VideoMetadataStep } from '../components/steps/VideoMetadataStep';
import { VideoSelectStep } from '../components/steps/VideoSelectStep';
import { useVideoStore } from '../store/useVideoStore';
import { Step, VideoFormData } from '../types/video';

export default function ModalScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('select');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [croppedVideo, setCroppedVideo] = useState<string | null>(null);
  const addVideo = useVideoStore((state) => state.addVideo);

  const handleSelect = (uri: string) => {
    setSelectedVideo(uri);
    setStep('crop');
  };

  const handleCrop = (uri: string) => {
    setCroppedVideo(uri);
    setStep('metadata');
  };

  const handleSave = async (metadata: VideoFormData) => {
    if (!croppedVideo) return;

    try {
      await addVideo({
        uri: croppedVideo,
        ...metadata,
      });
      router.back();
    } catch (error) {
      console.error('Error saving video:', error);
      alert('An error occurred while saving the video.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'New Video Entry' }} />
      <View className="flex-1 bg-gray-50 p-4">
        {step === 'select' && <VideoSelectStep onSelect={handleSelect} />}
        {step === 'crop' && selectedVideo && (
          <VideoCropStep videoUri={selectedVideo} onCrop={handleCrop} />
        )}
        {step === 'metadata' && croppedVideo && (
          <VideoMetadataStep videoUri={croppedVideo} onSave={handleSave} />
        )}
      </View>
    </>
  );
}
