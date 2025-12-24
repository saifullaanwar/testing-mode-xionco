// firebase-messaging-sw.js
const VERSION = '1.0.5';
console.log("Service Worker version:", VERSION);
self.addEventListener("install", (event) => {
  self.skipWaiting(); // langsung paksa SW baru jadi aktif
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // langsung klaim semua tab
  console.log("SW activated, version:", VERSION);
});
// Import Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Konfigurasi Firebase (sama seperti di HTML)
firebase.initializeApp({
  
});

// Buat instance Broadcast Channel dengan nama unik

const messaging = firebase.messaging();

// Handler notifikasi saat browser tidak aktif / background
messaging.setBackgroundMessageHandler(async function(payload) {
        
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const dataToSend = {
        type: "NEW_NOTIFICATION",
        body: payload.notification.body,
        role: payload.data?.role || null
    };

    try {
        const allClients = await clients.matchAll({
            includeUncontrolled: true,
            type: 'window'
        });

        allClients.forEach((client) => {
            if (client.url && 'postMessage' in client) {
                console.log('Sending message to client:', client.url);
                client.postMessage(dataToSend);
            }
        });
    } catch (error) {
        console.error('Failed to send message to clients:', error);
    }
});
