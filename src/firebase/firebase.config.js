import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFV2woo1M8-Sxc-4Gd6i_2VLDiPMoYGG0",
  authDomain: "exe-moda.firebaseapp.com",
  projectId: "exe-moda",
  storageBucket: "exe-moda.appspot.com",
  messagingSenderId: "26928338688",
  appId: "1:26928338688:web:85461eb36d4db93c5a05e5",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
