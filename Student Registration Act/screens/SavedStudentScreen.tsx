import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,} from 'react-native';

import { Student } from './RegistrationScreen';

type Props = {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
};

export default function SavedStudentScreen({
  student,
  onEdit,
  onDelete,
  onBack,
}: Props) {

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>
        Saved Student Information
      </Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.card}>

        <Text style={styles.label}>
          Full Name
        </Text>

        <Text style={styles.value}>
          {student.fullName}
        </Text>


        <Text style={styles.label}>
          Student ID
        </Text>

        <Text style={styles.value}>
          {student.studentId}
        </Text>


        <Text style={styles.label}>
          Course
        </Text>

        <Text style={styles.value}>
          {student.course}
        </Text>


        <Text style={styles.label}>
          Year Level
        </Text>

        <Text style={styles.value}>
          {student.yearLevel}
        </Text>


        <Text style={styles.label}>
          Email Address
        </Text>

        <Text style={styles.value}>
          {student.email}
        </Text>


        <Text style={styles.label}>
          Contact Number
        </Text>

        <Text style={styles.value}>
          {student.contactNumber}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={onEdit}
      >
        <Text style={styles.buttonText}>
          Edit Information
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.buttonText}>
          Delete Information
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
    fontSize: 26,
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

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },

  value: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 8,
  },

  editButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: '#c0392b',
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