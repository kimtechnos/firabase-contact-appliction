import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBvlauHTyYf6KVO1hE2J9W9NYnQs_bDwWs",
  authDomain: "firabase-contact-appliction.firebaseapp.com",
  projectId: "firabase-contact-appliction",
  storageBucket: "firabase-contact-appliction.appspot.com",
  messagingSenderId: "458079472296",
  appId: "1:458079472296:web:9b047d49a046691366109d",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const fireDb = getDatabase(app);

// Export the database reference
export default fireDb;
