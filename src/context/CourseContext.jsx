import React, { useState } from 'react';

export let CourseContext = React.createContext({
    courses: null,
    setCourses: () => {},
});

export function CourseContextProvider({ children, initial }) {
    const [courses, setCourses] = useState(initial);

    return (
        <CourseContext.Provider value={{ courses, setCourses }}>
            {children}
        </CourseContext.Provider>
    );
}
