import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, } from 'react-native';

type Props = {
  onBack: () => void;
  onSave: (student: Student) => void;
};

export type Student = {
  fullName: string;
  studentId: string;
  course: string;
  yearLevel: string;
  email: string;
  contactNumber: string;
};

export default function RegistrationScreen({
  onBack,
  onSave,
}: Props) {

  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSave = () => {

    if (
      fullName === '' ||
      studentId === '' ||
      course === '' ||
      yearLevel === '' ||
      email === '' ||
      contactNumber === ''
    ) {
      Alert.alert(
        'Incomplete Form',
        'Please fill in all fields.'
      );
      return;
    }

    const student: Student = {
      fullName,
      studentId,
      course,
      yearLevel,
      email,
      contactNumber,
    };

    onSave(student);
  };

  const handleClear = () => {
    setFullName('');
    setStudentId('');
    setCourse('');
    setYearLevel('');
    setEmail('');
    setContactNumber('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>
        Student Registration
      </Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.label}>
        Full Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>
        Student ID
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter student ID"
        value={studentId}
        onChangeText={setStudentId}
      />

      <Text style={styles.label}>
        Course
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter course"
        value={course}
        onChangeText={setCourse}
      />

      <Text style={styles.label}>
        Year Level
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter year level"
        value={yearLevel}
        onChangeText={setYearLevel}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Email Address
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Contact Number
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter contact number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClear}
      >
        <Text style={styles.buttonText}>
          Clear
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.buttonText}>
          Back to Home
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: '#530b9c',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  clearButton: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  backButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

});