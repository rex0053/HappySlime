import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthInfo = () => {
  // Initialize state variables
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergyInfo, setAllergyInfo] = useState('');
  const [medicationInfo, setMedicationInfo] = useState('');
  const [isSaved, setIsSaved] = useState(false); // State to track whether data is saved

  // Function to save health info
  const saveHealthInfo = async () => {
    try {
      await AsyncStorage.setItem('height', height);
      await AsyncStorage.setItem('weight', weight);
      await AsyncStorage.setItem('bloodType', bloodType);
      await AsyncStorage.setItem('allergyInfo', allergyInfo);
      await AsyncStorage.setItem('medicationInfo', medicationInfo);
      setIsSaved(true); // Update isSaved state upon successful save
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Function to fetch health info from AsyncStorage
  const loadHealthInfo = async () => {
    try {
      const savedHeight = await AsyncStorage.getItem('height');
      const savedWeight = await AsyncStorage.getItem('weight');
      const savedBloodType = await AsyncStorage.getItem('bloodType');
      const savedAllergyInfo = await AsyncStorage.getItem('allergyInfo');
      const savedMedicationInfo = await AsyncStorage.getItem('medicationInfo');

      if (savedHeight !== null) setHeight(savedHeight);
      if (savedWeight !== null) setWeight(savedWeight);
      if (savedBloodType !== null) setBloodType(savedBloodType);
      if (savedAllergyInfo !== null) setAllergyInfo(savedAllergyInfo);
      if (savedMedicationInfo !== null) setMedicationInfo(savedMedicationInfo);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // useEffect to load data when component mounts
  useEffect(() => {
    loadHealthInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View>
        <Text style={{ marginBottom: 5 }}>Height (cm):</Text>
        <TextInput
          style={{ marginBottom: 15, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Enter height"
        />

        <Text style={{ marginBottom: 5 }}>Weight (kg):</Text>
        <TextInput
          style={{ marginBottom: 15, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter weight"
        />

        <Text style={{ marginBottom: 5 }}>Blood Type:</Text>
        <TextInput
          style={{ marginBottom: 15, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
          value={bloodType}
          onChangeText={setBloodType}
          placeholder="Enter blood type"
        />

        <Text style={{ marginBottom: 5 }}>Allergy Information:</Text>
        <TextInput
          style={{ marginBottom: 15, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
          value={allergyInfo}
          onChangeText={setAllergyInfo}
          placeholder="Enter allergy info"
        />

        <Text style={{ marginBottom: 5 }}>Medication Information:</Text>
        <TextInput
          style={{ marginBottom: 15, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
          value={medicationInfo}
          onChangeText={setMedicationInfo}
          placeholder="Enter medication info"
        />

        <Button
          title="Save"
          onPress={saveHealthInfo}
          style={{ marginTop: 20, backgroundColor: 'blue', color: 'white', padding: 10, borderRadius: 5 }}
          color="#FF9999"
        />
        
        {/* Display save confirmation */}
        {isSaved && <Text style={{ marginTop: 10, color: 'green' }}>Data saved successfully!</Text>}
      </View>
    </ScrollView>
  );
};

export default HealthInfo;
