import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking, ActivityIndicator } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface VideoPlayerProps {
  videos: string[];
}

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth * 9) / 16; // Aspect ratio 16:9

  const currentVideoId = videos[currentIndex];
  const hasMultipleVideos = videos.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    setPlaying(false);
    setError(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    setPlaying(false);
    setError(false);
  };

  const openInYouTube = () => {
    const url = `https://www.youtube.com/watch?v=${currentVideoId}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        {hasMultipleVideos && (
          <TouchableOpacity style={styles.arrowLeft} onPress={goToPrevious}>
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>
        )}

        <View style={styles.videoContainer}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Carregando vídeo...</Text>
            </View>
          )}
          <YoutubeIframe
            height={videoHeight}
            videoId={currentVideoId}
            play={playing}
            onChangeState={(state: string) => {
              if (state === 'ended') {
                setPlaying(false);
              }
            }}
            onError={() => setError(true)}
            onReady={() => setLoading(false)}
            webViewProps={{
              androidLayerType: 'hardware',
              nestedScrollEnabled: true,
              allowsFullscreenVideo: true,
            }}
            forceAndroidAutoplay={false}
          />
        </View>

        {hasMultipleVideos && (
          <TouchableOpacity style={styles.arrowRight} onPress={goToNext}>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasMultipleVideos && (
        <View style={styles.pagination}>
          {videos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}

      {error && (
        <TouchableOpacity style={styles.errorButton} onPress={openInYouTube}>
          <Text style={styles.errorText}>
            ⚠️ Vídeo indisponível no app
          </Text>
          <Text style={styles.errorLink}>
            Toque para abrir no YouTube →
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.description}>
        {hasMultipleVideos 
          ? `🎥 Vídeo ${currentIndex + 1} de ${videos.length}`
          : '🎥 Vídeo demonstrativo da técnica'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  videoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  arrowLeft: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
  arrowRight: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  arrowText: {
    fontSize: 40,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  errorButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  errorLink: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
  },
});
