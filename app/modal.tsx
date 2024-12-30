import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { VideoMetadataForm } from '../components/VideoMetadataForm';
import { VideoPlayer } from '../components/VideoPlayer';
import { useVideoOperations } from '../hooks/useVideoOperations';
import { useVideoStore } from '../store/useVideoStore';

type Step = 'select' | 'crop' | 'metadata';

export default function ModalScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('select');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [croppedVideo, setCroppedVideo] = useState<string | null>(null);
  const addVideo = useVideoStore((state) => state.addVideo);
  const { cropVideo, isCropping } = useVideoOperations();

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
      setStep('crop');
    }
  };

  const handleCrop = async () => {
    if (!selectedVideo) return;

    try {
      const outputUri = await cropVideo({ sourceUri: selectedVideo });
      setCroppedVideo(outputUri);
      setStep('metadata');
    } catch (error) {
      console.error('Error cropping video:', error);
      alert('Failed to crop video. Please try again.');
    }
  };

  const handleSave = async (metadata: { name: string; description: string }) => {
    if (!croppedVideo) return;

    try {
      addVideo({
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
        {step === 'select' && (
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity onPress={pickVideo} className="rounded-lg bg-blue-500 px-6 py-3">
              <Text className="font-semibold text-white">Select Video</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'crop' && selectedVideo && (
          <View className="flex-1">
            <VideoPlayer uri={selectedVideo} />
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
        )}

        {step === 'metadata' && croppedVideo && (
          <View className="flex-1">
            <VideoPlayer uri={croppedVideo} />
            <VideoMetadataForm onSubmit={handleSave} />
          </View>
        )}
      </View>
    </>
  );
}
