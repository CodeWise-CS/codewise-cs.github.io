import React, { useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth, storage } from './firebase';
import { UserContext } from './context/UserContext';
import { CourseContext } from './context/CourseContext';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getDownloadURL, ref as sRef } from 'firebase/storage';
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import CourseOverview from './pages/CourseOverview/CourseOverview';
import CareerPathOverview from './pages/CareerPathOverview/CareerPathOverview';
import NotFound from './pages/NotFound/NotFound';
import LessonHandler from './pages/Lesson/LessonHandler';

export default function App() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { setCourses } = useContext(CourseContext);

    useEffect(() => {
        // Effect runs twice due to strict mode
        // Remove strict mode to reduce Firebase requests

        getDownloadURL(sRef(storage, 'codewise-courses.json'))
            .then((url) => fetch(url))
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => {
                console.error(error);
            });

        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            }
            if (auth.currentUser) {
                updateUser();
            }
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
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route
                path="/course-overview/:course"
                element={<CourseOverview />}
            />
            <Route
                path="/career-path-overview/:careerPath"
                element={<CareerPathOverview />}
            />
            <Route path="/lesson/:course" element={<LessonHandler />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
