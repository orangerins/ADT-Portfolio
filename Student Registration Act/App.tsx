import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import HomeScreen from './screens/HomeScreen';

import RegistrationScreen, {
  Student,
} from './screens/RegistrationScreen';

import SavedStudentScreen from './screens/SavedStudentScreen';

export default function App() {

  const [screen, setScreen] = useState('home');

  const [student, setStudent] = useState<Student | null>(null);

  const handleSaveStudent = (newStudent: Student) => {
    setStudent(newStudent);
    setScreen('saved');
  };

  const handleDeleteStudent = () => {

    setStudent(null);
    setScreen('home');

    Alert.alert(
      'Deleted',
      'Student information has been deleted.'
    );
  };

  return (
    <View style={styles.container}>

      {screen === 'home' && (
        <HomeScreen
          onRegister={() => setScreen('registration')}
          onViewSaved={() => {

            if (student !== null) {
              setScreen('saved');
            } else {
              Alert.alert(
                'No Saved Information',
                'There is no student information saved yet.'
              );
            }

          }}
        />
      )}

      {screen === 'registration' && (
        <RegistrationScreen
          onBack={() => setScreen('home')}
          onSave={handleSaveStudent}
        />
      )}

      {screen === 'saved' && student !== null && (
        <SavedStudentScreen
          student={student}
          onEdit={() => setScreen('registration')}
          onDelete={handleDeleteStudent}
          onBack={() => setScreen('home')}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});