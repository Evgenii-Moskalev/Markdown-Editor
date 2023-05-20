import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTLXSQj0DCsxxYdpRHAAhaBPBUtjeYbfs",
    authDomain: "react-notes-f5c31.firebaseapp.com",
    projectId: "react-notes-f5c31",
    storageBucket: "react-notes-f5c31.appspot.com",
    messagingSenderId: "881045819837",
    appId: "1:881045819837:web:687f241e07d150654e42d4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");