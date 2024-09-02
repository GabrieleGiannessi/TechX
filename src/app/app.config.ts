import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideMessaging, getMessaging, getToken } from '@angular/fire/messaging';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from "./app.routes"

const firebaseConfig = {
  apiKey: "AIzaSyBfLUXCZ8C8k4KgAGAO5sHrFSdDBtkboc8",
  authDomain: "app-saw2024.firebaseapp.com",
  projectId: "app-saw2024",
  storageBucket: "app-saw2024.appspot.com",
  messagingSenderId: "151881399800",
  appId: "1:151881399800:web:c13ea3f9b7f1777148aa0d",
  measurementId: "G-6Y8KGCYC2J"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideClientHydration(), 
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),  
      registrationStrategy: 'registerWhenStable:30000'
      })
    ]
};
