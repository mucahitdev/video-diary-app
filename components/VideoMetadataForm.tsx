import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { z } from 'zod';

const videoMetadataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
});

type VideoMetadataFormData = z.infer<typeof videoMetadataSchema>;

interface VideoMetadataFormProps {
  onSubmit: (data: VideoMetadataFormData) => void;
  initialData?: Partial<VideoMetadataFormData>;
}

export function VideoMetadataForm({ onSubmit, initialData }: VideoMetadataFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoMetadataFormData>({
    resolver: zodResolver(videoMetadataSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
  });

  return (
    <View className="gap-4 space-y-4 p-4">
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Video name"
              onChangeText={onChange}
              value={value}
              className="rounded-lg border border-gray-300 bg-white p-3"
            />
          )}
        />
        {errors.name && <Text className="mt-1 text-sm text-red-500">{errors.name.message}</Text>}
      </View>

      <View>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Video description"
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              className="rounded-lg border border-gray-300 bg-white p-3"
            />
          )}
        />
        {errors.description && (
          <Text className="mt-1 text-sm text-red-500">{errors.description.message}</Text>
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="rounded-lg bg-blue-500 p-4">
        <Text className="text-center font-semibold text-white">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
