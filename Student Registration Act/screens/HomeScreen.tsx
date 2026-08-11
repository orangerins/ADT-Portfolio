import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native';

type Props = {
  onRegister: () => void;
  onViewSaved: () => void;
};

export default function HomeScreen({
  onRegister,
  onViewSaved,
}: Props) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Student Registration
      </Text>

      <Text style={styles.subtitle}>
        Welcome to the Student Registration App
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRegister}
      >
        <Text style={styles.buttonText}>
          Register Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onViewSaved}
      >
        <Text style={styles.buttonText}>
          View Saved Information
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    width: '90%',
    backgroundColor: '#2a3ed8',
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