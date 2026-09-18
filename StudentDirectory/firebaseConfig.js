import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw5ItO3eeS_UXEbsYwokDhF1OIpRjLANM",
  authDomain: "cloudstudentdirectory.firebaseapp.com",
  projectId: "cloudstudentdirectory",
  storageBucket: "cloudstudentdirectory.firebasestorage.app",
  messagingSenderId: "498126363871",
  appId: "1:498126363871:web:c8936dc9982a7dc086dd6a",
  measurementId: "G-SDN239N9FS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);