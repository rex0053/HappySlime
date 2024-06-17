import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions'; // 이 부분도 바뀌어야 함

const EmergencyCall = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestContactsPermission();
  }, []);

  const requestContactsPermission = async () => {
    // 이 부분에서도 변경된 방식으로 권한을 요청해야 함
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setHasPermission(status === 'granted');
  };

  const handlePress = async () => {
    if (!hasPermission) {
      Alert.alert('권한 거부됨', '연락처에 접근할 수 없습니다.');
      return;
    }

    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      console.log(data);
      
      Alert.alert('연락처 불러오기 성공', `총 ${data.length}명의 연락처를 불러왔습니다.`);
    } catch (error) {
      console.error(error);
      Alert.alert('오류 발생', '연락처를 불러오는 데 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="긴급 연락처 불러오기" onPress={handlePress} color="#FF9999" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyCall;
