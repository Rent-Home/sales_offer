import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAHvSnoRzVTD7nINOGyl1MaqKI1QSNeLaQ",
  authDomain: "salesoffer-6fa52.firebaseapp.com",
  projectId: "salesoffer-6fa52",
  storageBucket: "salesoffer-6fa52.firebasestorage.app",
  messagingSenderId: "1081315610663",
  appId: "1:1081315610663:web:499fd95907132f8f20be02",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export async function generateToken() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BOWvvJKHagjeSWiJbdURlk0JZ83FzzS66jjGdFOZHkHAFNbxGLm3sS61z8tokB2MJADvXnlslzbw3B-BrksVfJ8",
    });

    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
}