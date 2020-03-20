import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
        apiKey: "AIzaSyCcorWxKm5mTVsZtUuSyEnd2ZYneRpCvVM",
        authDomain: "crwn-db-a950e.firebaseapp.com",
        databaseURL: "https://crwn-db-a950e.firebaseio.com",
        projectId: "crwn-db-a950e",
        storageBucket: "crwn-db-a950e.appspot.com",
        messagingSenderId: "789871771296",
        appId: "1:789871771296:web:01c588499968ccec33d3c5",
        measurementId: "G-V0LD4VZJCX"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        }catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;