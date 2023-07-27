import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [allUser,setAllUser]=useState(null);

  const login = () => {
    const fetchUser = () => {
      axios
        .get("http://localhost:8080/api/utilizatori")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => console.log("An error occured"));
    };

    fetchUser();
  };

  const fastLogin = (users) => {
    console.log("🚀 ~ file: userContext.jsx:24 ~ fastLogin ~ users:", users);
    if (users) setUser(users);
  };

  console.log("UserContext" + user);

  const userContextValue = { user, login };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
