importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAHvSnoRzVTD7nINOGyl1MaqKI1QSNeLaQ",
  authDomain: "salesoffer-6fa52.firebaseapp.com",
  projectId: "salesoffer-6fa52",
  storageBucket: "salesoffer-6fa52.firebasestorage.app",
  messagingSenderId: "1081315610663",
  appId: "1:1081315610663:web:499fd95907132f8f20be02",
});

const messaging = firebase.messaging();