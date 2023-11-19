import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";

import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyD9EOSlnmGS-kseGdB2F9nOWG9UIlSBP_E",
  authDomain: "cookbook-769df.firebaseapp.com",
  projectId: "cookbook-769df",
  storageBucket: "cookbook-769df.appspot.com",
  messagingSenderId: "644720982505",
  appId: "1:644720982505:web:7ddfea4d742c26c2c23378",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const currentUser = writable(null);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.set(user);
  } else {
    currentUser.set(null);
  }
});

export async function signIn() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        currentUser.set(user);
        fetch(`/api/login?uid=${user.uid}`);
        resolve(user);
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject(error);
      });
  });
}

export async function addRecipe(recipe) {
  const docRef = await addDoc(collection(db, "recipes"), recipe);
  return docRef;
}

export async function getUserRecipes() {
  return new Promise((resolve, reject) => {
    currentUser.subscribe(async (user) => {
      if (user) {
        const q = query(collection(db, "recipes"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const recipes = [];
        querySnapshot.forEach((doc) => {
          recipes.push({ id: doc.id, ...doc.data() });
        });
        resolve(recipes);
      }
    });
  });
}

export async function getRecipes(uid) {
  const q = query(collection(db, "recipes"), where("user", "==", uid));
  const querySnapshot = await getDocs(q);
  const recipes = [];
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });
  return recipes;
}

export async function getRecipe(id) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      resolve({ id: docSnap.id, ...docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });
}
