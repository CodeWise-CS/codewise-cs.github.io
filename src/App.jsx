import React, { useEffect, useContext } from 'react';
import './App.css';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import { auth, storage } from './firebase';
import { UserContext } from './context/UserContext';
import { CourseContext } from './context/CourseContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getDownloadURL, ref as sRef } from 'firebase/storage';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import CourseOverview from './pages/CourseOverview/CourseOverview';
import CareerPathOverview from './pages/CareerPathOverview/CareerPathOverview';
import NotFound from './pages/NotFound/NotFound';
import LessonHandler from './pages/Lesson/LessonHandler';
import CourseCompletion from './pages/CourseCompletion/CourseCompletion';

export default function App() {
    const { user } = useContext(UserContext);
    const { setCourses } = useContext(CourseContext);

    useEffect(() => {
        getDownloadURL(sRef(storage, 'codewise-courses.json'))
            .then((url) => fetch(url))
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/login" element={<Auth />} />
            <Route
                path="/course-overview/:course"
                element={<ProtectedRoute element={<CourseOverview />} />}
            />
            <Route
                path="/career-path-overview/:careerPath"
                element={<ProtectedRoute element={<CareerPathOverview />} />}
            />
            <Route
                path="/lesson/:course"
                element={<ProtectedRoute element={<LessonHandler />} />}
            />
            <Route
                path="/completed/:course"
                element={<ProtectedRoute element={<CourseCompletion />} />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
