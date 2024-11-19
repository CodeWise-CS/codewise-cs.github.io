import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, set, child, get, remove } from 'firebase/database';

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

export function logOut() {
    signOut(auth);
}

export function createUser(uid) {
    console.log('CREATE USER: ', uid);
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
            console.log(error);
        });
}

export function getUserData(uid) {
    return new Promise((resolve, reject) => {
        const database = getDatabase();

        get(child(ref(database), `users/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    console.log('Accessed user data from Firebase: ', data);
                    resolve(data);
                } else {
                    console.log('Data not available');
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
