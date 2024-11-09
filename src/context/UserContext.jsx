import React, { useState } from 'react';

export const UserContext = React.createContext({
    user: null,
    setUser: () => {},
});

export function UserContextProvider({ children, initial }) {
    const [user, setUser] = useState(initial);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
