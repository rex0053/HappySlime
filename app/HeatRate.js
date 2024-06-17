import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Pedometer } from 'expo-sensors';
import { clamp } from 'react-native-reanimated';

const Calm = () => {
  const videoId = 'NUKKHsgD3rc'; // YouTube 비디오 ID
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const subscribeToStepCount = async () => {
      try {
        const subscription = Pedometer.watchStepCount(result => {
          setStepCount(result.steps);
        });

        // 매 분마다 걸음 수 업데이트
        const interval = setInterval(() => {
          Pedometer.getStepCountAsync(new Date(), new Date()).then(result => {
            setStepCount(result.steps);
          });
        }, 60000);

        return () => {
          subscription.remove();
          clearInterval(interval);
        };
      } catch (error) {
        console.error('걸음 수 가져오기 오류:', error);
      }
    };

    subscribeToStepCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: videoUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
        />
      </View>
      <View style={styles.stepCounterContainer}>
        <Text style={styles.stepCounterText}>걸음 수: {stepCount}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  stepCounterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  stepCounterText: {
    fontSize: 18,
  },
});

export default Calm;
