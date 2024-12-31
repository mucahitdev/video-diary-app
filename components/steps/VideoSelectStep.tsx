import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity } from 'react-native';

interface VideoSelectStepProps {
  onSelect: (uri: string, duration: number | null | undefined) => void;
}

export function VideoSelectStep({ onSelect }: VideoSelectStepProps) {
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri, result.assets[0].duration);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={pickVideo} className="rounded-lg bg-blue-500 px-6 py-3">
        <Text className="font-semibold text-white">Select Video</Text>
      </TouchableOpacity>
    </View>
  );
}
