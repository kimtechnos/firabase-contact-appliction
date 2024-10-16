import firebase, { deleteApp } from "firebase/app";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBvlauHTyYf6KVO1hE2J9W9NYnQs_bDwWs",
  authDomain: "firabase-contact-appliction.firebaseapp.com",
  projectId: "firabase-contact-appliction",
  storageBucket: "firabase-contact-appliction.appspot.com",
  messagingSenderId: "458079472296",
  appId: "1:458079472296:web:9b047d49a046691366109d",
};
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
