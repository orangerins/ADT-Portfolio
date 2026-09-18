import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from "react-native";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebaseConfig";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const list = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setStudents(list);
    });

    return unsubscribe;
  }, []);

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const clearForm = () => {
    setName("");
    setCourse("");
    setYearLevel("");
    setEmail("");
    setAge("");
    setImage("");
    setEditingId("");
  };

  const saveStudent = async () => {
    if (!name || !course || !yearLevel || !email || !age) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const data = {
      name,
      course,
      yearLevel,
      email,
      age,
      image,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "students", editingId), data);
        Alert.alert("Success", "Student updated!");
      } else {
        await addDoc(collection(db, "students"), data);
        Alert.alert("Success", "Student added!");
      }

      clearForm();
    } catch {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const editStudent = (item: any) => {
    setName(item.name);
    setCourse(item.course);
    setYearLevel(item.yearLevel);
    setEmail(item.email);
    setAge(item.age);
    setImage(item.image || "");
    setEditingId(item.id);
  };

  const removeStudent = (id: string) => {
    Alert.alert("Delete Student", "Are you sure you want to delete this student?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(doc(db, "students", id));
        },
      },
    ]);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={students}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Student Directory</Text>
          <Text style={styles.subtitle}>Student Information</Text>

          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {editingId ? "Edit Student" : "Add Student"}
            </Text>

            <TouchableOpacity style={styles.photoBox} onPress={choosePhoto}>
              {image ? (
                <Image source={{ uri: image }} style={styles.photo} />
              ) : (
                <View style={styles.photo}>
                  <Text style={styles.photoIcon}>👤</Text>
                </View>
              )}

              <View>
                <Text style={styles.photoTitle}>Profile Picture</Text>
                <Text style={styles.photoText}>Choose Photo</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Student Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Course / Program"
              value={course}
              onChangeText={setCourse}
            />

            <TextInput
              style={styles.input}
              placeholder="Year Level"
              value={yearLevel}
              onChangeText={setYearLevel}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.saveButton} onPress={saveStudent}>
              <Text style={styles.saveText}>
                {editingId ? "Update Student" : "Add Student"}
              </Text>
            </TouchableOpacity>

            {editingId ? (
              <TouchableOpacity onPress={clearForm}>
                <Text style={styles.cancelText}>Cancel Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.recordsTitle}>
            Student Records ({students.length})
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.studentPhoto} />
          ) : (
            <View style={styles.studentPhoto}>
              <Text style={styles.photoIcon}>👤</Text>
            </View>
          )}

          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.course}>{item.course} • {item.yearLevel}</Text>
            <Text style={styles.info}>{item.email}</Text>
            <Text style={styles.info}>Age: {item.age}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editStudent(item)}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeStudent(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No student records yet.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 3,
    marginBottom: 20,
  },

  form: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 2,
  },

  formTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },

  photoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  photo: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  photoIcon: {
    fontSize: 25,
  },

  photoTitle: {
    fontWeight: "bold",
    color: "#334155",
  },

  photoText: {
    color: "#2563EB",
    fontSize: 12,
    marginTop: 2,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 9,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#F8FAFC",
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 9,
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  cancelText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 12,
  },

  recordsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    elevation: 1,
  },

  studentPhoto: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },

  course: {
    color: "#2563EB",
    fontSize: 13,
    marginTop: 2,
  },

  info: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 10,
  },

  editButton: {
    backgroundColor: "#DBEAFE",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 7,
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 7,
  },

  editText: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "bold",
  },

  empty: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
  },

  emptyText: {
    color: "#94A3B8",
  },
});