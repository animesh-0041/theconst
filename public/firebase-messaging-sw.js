/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js"
);

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    onMessage(messaging, (payload) => {
        alert(payload.notification.body);
    });

    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    };
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
        client.postMessage({
            type: "NEW_NOTIFICATION",
            payload: payload.notification,
        });
        });
    });
    self.registration.showNotification(notificationTitle, notificationOptions);
    alert(payload.notification.body);
});
