import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { VideoPlayer } from '../../components/VideoPlayer';
import { useVideoStore } from '../../store/useVideoStore';

export default function TabOneScreen() {
  const videos = useVideoStore((state) => state.videos);

  if (videos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-4 text-center text-lg text-gray-600">
          No videos yet. Add your first video diary entry!s
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
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 space-y-4"
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity className="overflow-hidden rounded-lg bg-white shadow">
              <VideoPlayer uri={item.uri} />
              <View className="p-4">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-600" numberOfLines={2}>
                  {item.description}
                </Text>
                <Text className="mt-2 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
      <Link href="/modal" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg">
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
