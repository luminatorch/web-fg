// firebaseOperations.js
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, deleteDoc, updateDoc, arrayUnion, query, where, getDocs, getDoc, arrayRemove } from 'firebase/firestore';
import db from '../../firebase-config';

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

// Create a score with the model
export const newScore = async (score, total_score) => {

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error("No authenticated user found. ");
        return { success: false, error: "No authenticated user. "};
    }

    try {

      const userDocID = await getUserDocumentId(user.uid);
      const scoreRef = await addDoc(collection(db, 'scores'), {
          patientName: score.patientName,
          totalScore: total_score,
          score: {
            fibrillation: score.score.fibrillation,
            age: score.score.age,
            strokeScale: score.score.strokeScale,
            tHemorrhage: score.score.tHemorrhage,
            glucose: score.score.glucose,
            aspects: score.score.aspects,
            injury: score.score.injury,
            nasoenteral: score.score.nasoenteral
          },
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

// Fetch all scores
export const fetchScores = async (uid) => {
  const userId = await getUserDocumentId(uid);
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userScoresIds = userDocSnap.data().scores; // The array of scores document IDs
    const scoresDataPromises = userScoresIds.map(scoreId => getDoc(doc(db, 'scores', scoreId)));
    const scoresDataSnapshots = await Promise.all(scoresDataPromises);

    const scoresData = scoresDataSnapshots.map(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
    return scoresData; // Array of score data objects
  } else {
    console.log("No such user document!");
    return [];
  }
};


// Update a score
export const updateScore = async (scoreId, updatedFields) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.error("No authenticated user found. ");
        return { success: false, error: "No authenticated user. "};
    }

    const scoreRef = doc(db, 'scores', scoreId);

    try {
      await updateDoc(scoreRef, updatedFields);
    } catch (error) {
      console.error("Error updating score: ", error);
      
    }
    
};

// Delete a score
export const deleteScore = async (scoreId) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.error("No authenticated user found. ");
        return { success: false, error: "No authenticated user. "};
    }

    try {
      // Delete from scores collection
      await deleteDoc(doc(db, 'scores', scoreId));

      // Now delete from the 'scores' array in the user document
      const userId = await getUserDocumentId(user.uid);
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        scores: arrayRemove(scoreId)
      });
    } catch (error) {
      console.error("Error deleting score: ", error);
    }
};



// FOR DEVELOPMENT ONLY
export const deleteAllDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((document) => {
    deleteDoc(doc(db, collectionName, document.id));
  });
};

// STILL DEVELOPMENT ONLY
export const clearUserScores = async () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const userId = await getUserDocumentId(user.uid);
  const userDocRef = doc(db, "users", userId);
  try {
    await updateDoc(userDocRef, {
      scores: [] // Set scores array to an empty array
    });
    console.log("Scores array cleared for user:", userId);
  } catch (error) {
    console.error("Error clearing scores array:", error);
  }
};