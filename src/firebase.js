import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCMdByUlf7Cg-fCaTl2McQ2FTCA0GAN77I',
    authDomain: 'codewise-a0689.firebaseapp.com',
    projectId: 'codewise-a0689',
    storageBucket: 'codewise-a0689.appspot.com',
    messagingSenderId: '1064488163759',
    appId: '1:1064488163759:web:42fc0f15c1d9985de1f75a',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

export const auth = getAuth(app);
export default app;
export const storage = getStorage();
export const firestore = getFirestore();

export function logOut() {
    signOut(auth);
}

export function createUser(uid) {
    const data = {
        completedLessons: [],
        careerPaths: [],
        coursesInProgress: {},
        bio: 'No bio',
    };

    set(ref(database, `users/${uid}`), data)
        .then(() => {
            console.log('Set values');
        })
        .catch((error) => {
            console.error(error);
        });
}

export function getUserData(uid) {
    return new Promise((resolve, reject) => {
        const database = getDatabase();

        get(child(ref(database), `users/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    resolve(data);
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

export function setUserData(value, dirPath = '') {
    const userId = auth.currentUser.uid;

    set(ref(database, `users/${userId}/${dirPath}`), value);
}

export async function fetchData(collectionPath) {
    try {
        const collectionRef = collection(firestore, collectionPath);
        const querySnapshot = await getDocs(collectionRef);
        const documents = [];

        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        return documents;
    } catch (error) {
        console.error('Error fetching collection:', error);
        return null;
    }
}
