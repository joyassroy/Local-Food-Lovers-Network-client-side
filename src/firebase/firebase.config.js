
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmEUKeROoQbZQcuJf9ZctUhnPcdzYkmig",
  authDomain: "local-food-lovers-networ-7d10e.firebaseapp.com",
  projectId: "local-food-lovers-networ-7d10e",
  storageBucket: "local-food-lovers-networ-7d10e.firebasestorage.app",
  messagingSenderId: "1005601079956",
  appId: "1:1005601079956:web:a43775aff1bba197206a81"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;