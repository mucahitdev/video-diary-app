import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';

interface VideoPlayerProps {
  uri: string;
  style?: object;
}

export function VideoPlayer({ uri, style }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (playing) => {
      setIsPlaying(playing.isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const togglePlayback = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View className="relative h-64 w-full rounded-lg">
      <VideoView
        ref={videoRef}
        player={player}
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: 8,
            backgroundColor: '#1f2937',
          },
          style,
        ]}
        contentFit="contain"
        allowsFullscreen
        nativeControls
      />
      <TouchableOpacity
        className="absolute bottom-4 right-4 h-12 w-12 items-center justify-center rounded-full bg-black/50"
        onPress={togglePlayback}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
