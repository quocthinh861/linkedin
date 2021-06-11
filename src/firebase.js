import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBe4CGpY-iw_QBlaeJEMm2R9hTxESS25WY",
    authDomain: "linkedin-clone-363bb.firebaseapp.com",
    projectId: "linkedin-clone-363bb",
    storageBucket: "linkedin-clone-363bb.appspot.com",
    messagingSenderId: "585299303446",
    appId: "1:585299303446:web:12b4d547d610ee66e82937"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;