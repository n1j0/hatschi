/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyA7CMfHOMzHdBMnQQENAxHcvYxouPvc0KE',
    projectId: 'hatschi-5e899',
    messagingSenderId: '732797313613',
    appId: '1:732797313613:web:be3432c1a7066abe85b204'
})

const messaging = firebase.messaging()
