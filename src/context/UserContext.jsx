import React from "react";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({ children, initial }) {
  const [user, setUser] = React.useState(initial);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
