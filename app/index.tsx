import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalmDown from './HeatRate';  // TestScreen 컴포넌트 불러오기
import HealthInfo from './info';  // 건강정보 컴포넌트 불러오기
import DiaryScreen from './DiaryScreen.js';  // 오늘의기분 컴포넌트 불러오기
import EmergencyCall from './EmergencyCall';  // 오늘의기분 컴포넌트 불러오기

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [pressCount, setPressCount] = useState(0);

  const handleSlimePress = () => {
    const newCount = pressCount + 1;
    setPressCount(newCount);
    Alert.alert(`버튼을 ${newCount}번 눌렀습니다.`);
    // 다른 페이지로 이동하려면 아래와 같이 navigate 함수를 사용합니다.
    // navigation.navigate('CalmDown');
  };

  const handleInfoPress = () => {
    navigation.navigate('HealthInfo');
  };

  const handleDiaryPress = () => {
    navigation.navigate('DiaryScreen');
  };

  const handleCallPress = () => {
    navigation.navigate('CalmDown');
  };

  return (
    <View style={styles.container}>
      {/* 중앙의 하트 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSlimePress}>
        <Image
          source={{ uri: 'https://i.ibb.co/xDR7NSw/Slime.png' }} // 외부 이미지 URL
          style={styles.image}
        />
      </TouchableOpacity>
      {/* 하트를 둘러싸는 세 개의 버튼 */}
      <TouchableOpacity style={styles.squareButton1} onPress={handleInfoPress}>
        <Image
          source={{ uri: 'https://i.ibb.co/6tDdkz2/square2text.png' }} // 외부 이미지 URL
          style={styles.simage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.squareButton2} onPress={handleCallPress}>
        <Image
          source={{ uri: 'https://i.ibb.co/T4zWCnL/square1-fixed.png ' }} // 외부 이미지 URL
          style={styles.aimage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.squareButton3} onPress={handleDiaryPress}>
        <Image
          source={{ uri: 'https://i.ibb.co/NjCCdcQ/square3text.png' }} // 외부 이미지 URL
          style={styles.zimage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CalmDown" component={CalmDown} />
        <Stack.Screen name="HealthInfo" component={HealthInfo} />
        <Stack.Screen name="EmergencyCall" component={EmergencyCall} />
        <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
      </Stack.Navigator>
    </>
  );
}

// 스타일 시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    transform: [{ translateX: 0 }, { translateY: 110 }], // 중앙에서 좌표 이동
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  squareButton1: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -75 }, { translateY: -100 }], // 중앙에서 좌표 이동
  },
  squareButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: 75 }, { translateY: -225 }], // 중앙에서 좌표 이동
  },
  squareButton3: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: 0 }, { translateY: -200 }], // 중앙에서 좌표 이동
  },
  simage: {
    width: 125,
    height: 125,
  },
  aimage: {
    width: 125,
    height: 125,
  },
  zimage: {
    width: 275,
    height: 125,
  },
  customButton: {
    width: 100,
    height: 100,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  customButtonTop: {
    top: -120, // 변경된 부분
  },
  customButtonLeft: {
    left: -120, // 변경된 부분
  },
  customButtonRight: {
    right: -120, // 변경된 부분
  },
  customButtonBottom: {
    bottom: -120, // 변경된 부분
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }] // 텍스트 회전
  },
});


export default App;