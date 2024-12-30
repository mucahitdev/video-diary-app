import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { VideoList } from '../components/VideoList';
import { useVideoStore } from '../store/useVideoStore';

export default function HomeScreen() {
  const videos = useVideoStore((state) => state.videos);

  if (videos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-4 text-center text-lg text-gray-600">
          No videos yet. Add your first video diary entry!
        </Text>
        <Link href="/modal" asChild>
          <TouchableOpacity className="rounded-lg bg-blue-500 px-6 py-3">
            <Text className="font-semibold text-white">Add Video</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <VideoList videos={videos} />
      <Link href="/modal" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg">
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
