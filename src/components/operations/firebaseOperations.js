// firebaseOperations.js
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, updateDoc, arrayUnion, query, where, getDocs, getDoc } from 'firebase/firestore';
import db from '../../firebase-config';
import { FormControlLabel } from '@mui/material';

// Function to create a new user
export const createNewUser = async (email, password, name) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add a new document in Firestore with the additional user info
    const docRef = await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      email,
      scores: []
    });


    // Update the document with its ID
    await setDoc(doc(db, 'users', docRef.id), { document_id: docRef.id }, { merge: true });

    return { success: true, userId: user.uid, docId: docRef.id };
  } catch (error) {
    console.error("Error creating new user: ", error);
    return { success: false, error: error.message };
  }
};

// Create a new score
export const newScore = async (patient_name, scoreData, total_score) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error("No authenticated user found. ");
        return { success: false, error: "No authenticated user. "};
    }

    try {

        const userDocID = await getUserDocumentId(user.uid);
        const scoreRef = await addDoc(collection(db, 'scores'), {
            patientName: patient_name,
            totalScore: total_score,
            score: scoreData,
            createdAt: new Date(),
            userId: user.uid
        });

        const userDocRef = doc(db, 'users', userDocID);

        await updateDoc(userDocRef, {
            scores: arrayUnion(scoreRef.id)
        });

        return { success: true, scoreId: scoreRef.id };
    } catch (error) {
        console.error("Error adding new score: ", error);
        return { success: false, error: error.message };
    }
}

// Get the document ID of a user
export const getUserDocumentId = async (uid) => {

    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Assuming uid is unique and only one document exists
      const docId = querySnapshot.docs[0].id; // This is your document ID
      return docId;
    } else {
      console.log("No document found for the given UID.");
      return null;
    }
};


// List all scores of a user
// export const listScores = async () => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//       console.error("No authenticated user found. ");
//       return { success: false, error: "No authenticated user. "};
//   }

//   try {
//     const userDocID = await getUserDocumentId(user.uid);

//     const userDocRef = doc(db, 'users', userDocID);
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       const dataArray = userDocSnapshot.data().scores;
//       dataArray.forEach(element => {
//         <FormControlLabel>
//           element
//         </FormControlLabel>
//       });
      
//     } else {
//       console.log("The document does not exist")
//     }

    
    
//   } catch (error) {
    
//   }

// }


export const listScores = async (uid) => {
  //const auth = getAuth();
  //const user = auth.currentUser;
  const userId = await getUserDocumentId(uid);
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userScoresIds = userDocSnap.data().scores; // The array of scores document IDs
    const scoresPromises = userScoresIds.map(scoreId => getDoc(doc(db, 'scores', scoreId)));
    const scoresDocs = await Promise.all(scoresPromises);

    const scores = scoresDocs.map(doc => ({ id: doc.id, patientName: doc.data().patientName, totalScore: doc.data().totalScore }));
    return scores; // Array of score objects
  } else {
    console.log("No such user document!");
    return [];
  }
};