import { Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function ProtectedRoute({ element }) {
    const { user, setUser } = useContext(UserContext);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                alert(
                    'Notice: CodeWise is an open-source project that is still in development. The courses are not completed and you may find bugs.\n\nFor information about contributing to the website, please visit https://github.com/CodeWise-CS/codewise-cs.github.io\nTo contribute to the curriculum, please visit https://github.com/CodeWise-CS/codewise-curriculum'
                );
            } else {
                setUser(null);
            }
            if (auth.currentUser) {
                updateUser();
            }
            setAuthChecked(true);
        });

        function updateUser() {
            const database = getDatabase();
            const userRef = ref(database, 'users/' + auth.currentUser.uid);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUser(data);
                } else {
                    console.log('Data not found');
                }
            });
        }

        if (!user && auth.currentUser) {
            updateUser();
        }

        return () => unsubscribe();
    }, []);

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    return user ? element : <Navigate to="/login" />;
}
