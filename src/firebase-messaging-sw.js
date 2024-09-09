
importScripts('/assets/firebase/firebase-app.js'); //hosting locale
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js');
importScripts('./ngsw-worker.js'); 

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

self.addEventListener("notificationclick", function (event) {
  console.debug('SW notification click event', event)

  const url = event.notification.data.link
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
        
        for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(url);
        }
    })
);
})

messaging.onBackgroundMessage((payload) => {
  console.log('Messaggio ricevuto in background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
