import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDouFbdR5WreMlANQxhFJbVWDw263Wk9Rc",
  authDomain: "social-media-app-91d18.firebaseapp.com",
  projectId: "social-media-app-91d18",
  storageBucket: "social-media-app-91d18.appspot.com",
  messagingSenderId: "15035868144",
  appId: "1:15035868144:web:6a81e0fb01682d14efb335"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db};
