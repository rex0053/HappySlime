import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiaryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [diaryEntry, setDiaryEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState({});

  useEffect(() => {
    loadDiaryEntries();
  }, []);

  const loadDiaryEntries = async () => {
    try {
      const entries = await AsyncStorage.getItem('diaryEntries');
      if (entries !== null) {
        setSavedEntries(JSON.parse(entries));
      }
    } catch (error) {
      console.error('Error loading diary entries:', error);
    }
  };

  const saveDiaryEntry = async () => {
    try {
      const updatedEntries = { ...savedEntries };
      updatedEntries[selectedDate] = diaryEntry;
      await AsyncStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      setModalVisible(false);
      setSavedEntries(updatedEntries);
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const getDiaryEntryForDate = () => {
    return savedEntries[selectedDate] || '';
  };

  const openModalForDate = (date) => {
    setSelectedDate(date);
    setDiaryEntry(getDiaryEntryForDate());
    setModalVisible(true);
  };

  const onDayPress = (day) => {
    openModalForDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openModalForDate(selectedDate)} style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {selectedDate}
        </Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Write Diary Entry</Text>
          <Calendar
            current={selectedDate}
            onDayPress={onDayPress}
            markedDates={{ [selectedDate]: { selected: true } }}
            style={styles.calendar}
          />
          <TextInput
            style={styles.diaryInput}
            multiline
            placeholder="Write your diary entry here..."
            value={diaryEntry}
            onChangeText={text => setDiaryEntry(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={saveDiaryEntry} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  dateContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  dateText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  diaryInput: {
    height: 200,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default DiaryScreen;

