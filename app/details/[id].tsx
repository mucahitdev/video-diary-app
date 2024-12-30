import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { VideoMetadataForm } from '../../components/VideoMetadataForm';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useVideoStore } from '../../store/useVideoStore';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { videos, updateVideo, deleteVideo } = useVideoStore();
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-gray-600">Video not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-lg bg-blue-500 px-6 py-3">
          <Text className="font-semibold text-white">Go Backs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    deleteVideo(id);
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? 'Edit Video' : video.name,
          headerRight: () => (
            <View className="flex-row space-x-4">
              <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                <Ionicons name={isEditing ? 'close' : 'create-outline'} size={24} color="#0284c7" />
              </TouchableOpacity>
              {!isEditing && (
                <TouchableOpacity onPress={handleDelete}>
                  <Ionicons name="trash-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
      <View className="flex-1 bg-gray-50">
        <VideoPlayer uri={video.uri} />
        {isEditing ? (
          <VideoMetadataForm
            initialData={video}
            onSubmit={(data) => {
              updateVideo(id, data);
              setIsEditing(false);
            }}
          />
        ) : (
          <View className="p-4">
            <Text className="text-2xl font-semibold">{video.name}</Text>
            <Text className="mt-2 text-gray-600">{video.description}</Text>
            <Text className="mt-4 text-sm text-gray-500">
              Created on {new Date(video.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
