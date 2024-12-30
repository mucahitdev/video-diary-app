import { Link } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { VideoEntry } from '../types/video';
import { VideoPlayer } from './VideoPlayer';

interface VideoListProps {
  videos: VideoEntry[];
}

export function VideoList({ videos }: VideoListProps) {
  return (
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
  );
}
