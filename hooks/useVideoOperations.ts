import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

interface CropVideoParams {
  sourceUri: string;
  startTime: number;
  duration?: number;
}

export function useVideoOperations() {
  const cropVideoMutation = useMutation({
    mutationFn: async ({ sourceUri, startTime, duration = 5 }: CropVideoParams) => {
      const outputUri = `${FileSystem.cacheDirectory}cropped_${Date.now()}.mp4`;

      const session = await FFmpegKit.execute(
        `-ss ${startTime} -i "${sourceUri}" -t ${duration} -c:v copy -c:a copy "${outputUri}"`
      );

      const returnCode = await session.getReturnCode();
      if (!ReturnCode.isSuccess(returnCode)) {
        throw new Error('Failed to crop video');
      }

      const logs = await session.getAllLogsAsString();
      console.log('FFmpeg process logs:', logs);

      return outputUri;
    },
    onError: (error) => {
      console.error('Error in cropVideoMutation:', error);
      throw error;
    },
  });

  return {
    cropVideo: cropVideoMutation.mutateAsync,
    isCropping: cropVideoMutation.isPending,
    cropError: cropVideoMutation.error,
  };
}
