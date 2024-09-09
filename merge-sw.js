const fs = require('fs');
const path = require('path');

// Percorsi dei file
const ngswWorkerPath = path.join(__dirname, 'dist/tech-x/browser/ngsw-worker.js'); // service worker di Angular
const firebaseSWPath = path.join(__dirname, 'src/firebase-messaging-sw.js'); // service worker di firebase
const outputSWPath = ngswWorkerPath;

// Leggi i contenuti dei file
const ngswWorkerContent = fs.readFileSync(ngswWorkerPath, 'utf8');
const firebaseSWContent = fs.readFileSync(firebaseSWPath, 'utf8');

// Unisci i contenuti
const mergedSWContent = `${ngswWorkerContent}\n\n// Firebase Messaging Service Worker\n${firebaseSWContent}`;

// Scrivi il nuovo file
fs.writeFileSync(outputSWPath, mergedSWContent, 'utf8');

console.log('Service Worker combinato con Firebase Messaging con successo!');
