import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCITvJNpH0eYSft9CAk360UUXoCIOZnl5o",
    authDomain: "score-app-d9572.firebaseapp.com",
    projectId: "score-app-d9572",
    storageBucket: "score-app-d9572.appspot.com",
    messagingSenderId: "718093172886",
    appId: "1:718093172886:web:299b6a826045c5c0c402b7",
    measurementId: "G-G4WL1605FS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
