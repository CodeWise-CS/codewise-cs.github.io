import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth, storage } from "./firebase";
import { UserContext } from "./context/UserContext";
import { CourseContext } from "./context/CourseContext";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import CourseOverview from "./pages/CourseOverview/CourseOverview";
import NotFound from "./pages/NotFound/NotFound";
import LessonHandler from "./pages/Lesson/LessonHandler";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const { setCourses } = React.useContext(CourseContext);

  React.useEffect(() => {
    // Effect runs twice due to strict mode
    // Remove strict mode to reduce Firebase requests

    getDownloadURL(sRef(storage, "codewise-courses.json"))
      .then((url) => {
        console.log(url);
        return fetch(url);
      })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.log(error);
      });

    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
      if (auth.currentUser) {
        //   const database = getDatabase();
        //   const userRef = ref(database, "users/" + auth.currentUser.uid);
        //   onValue(userRef, (snapshot) => {
        //     const data = snapshot.val();
        //     if (data) {
        //       setUser(data);
        //     } else {
        //       console.log("Data not found. Snapshot: ", snapshot);
        //     }
        //   });
        updateUser();
      }
    });

    function updateUser() {
      console.log("Update user");
      const database = getDatabase();
      const userRef = ref(database, "users/" + auth.currentUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log("User data: ", data);
        if (data) {
          setUser(data);
        } else {
          console.log("Data not found");
        }
      });
    }

    console.log(user, auth.currentUser);

    if (!user && auth.currentUser) {
      updateUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/course-overview/:course" element={<CourseOverview />} />
      <Route path="/lesson/:course" element={<LessonHandler />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
