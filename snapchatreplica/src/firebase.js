import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCDhttffjWdr2LKiNfS4t2njl6vzR7hm4g',
  authDomain: 'snapchat-replica-e24df.firebaseapp.com',
  projectId: 'snapchat-replica-e24df',
  storageBucket: 'snapchat-replica-e24df.appspot.com',
  messagingSenderId: '861353040734',
  appId: '1:861353040734:web:fa3185cca5f8f6bcdb4dcf',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
