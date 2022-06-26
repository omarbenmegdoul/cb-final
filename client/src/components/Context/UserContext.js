import React, { useEffect, useState } from 'react';
const UserContext = React.createContext({});
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        !username
            ? setUserData(null)
            : fetch(`http://localhost:5678/user/${username}`)
                  .then((res) => res.json())
                  .then((json) => JSON.parse(json))
                  .then((data) => setUserData(data))
                  .catch((e) =>
                      console.log(
                          '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>UserContext.js:15 "e"',
                          e
                      )
                  );
    }, [username]);
    return (
        <UserContext.Provider
            value={{
                username,
                userData,
                setUsername,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserContext;
