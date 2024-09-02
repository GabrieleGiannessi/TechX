
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBfLUXCZ8C8k4KgAGAO5sHrFSdDBtkboc8",
    authDomain: "app-saw2024.firebaseapp.com",
    projectId: "app-saw2024",
    storageBucket: "app-saw2024.appspot.com",
    messagingSenderId: "151881399800",
    appId: "1:151881399800:web:c13ea3f9b7f1777148aa0d",
    measurementId: "G-6Y8KGCYC2J"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Messaggio ricevuto in background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
