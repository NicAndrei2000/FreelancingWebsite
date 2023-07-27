import { Fragment, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cookies from "universal-cookie";

import "./App.css";
import Institutions from "./pages/Institutions/Institutions";
import Companies from "./pages/Companies/Companies";
import ProjectsCategory from "./pages/ProjectsCategory/ProjectsCategory";
import AllProjectsSameCategory from "./pages/AllProjectsSameCategory/AllProjectsSameCategory";
import AddProjects from "./pages/AddProjects/AddProjects";
import ViewProjects from "./pages/ViewProjects/ViewProjects";
import MyProjects from "./pages/MyProjects/MyProjects";
import { UserContext } from "./contexts/userContext";
import ViewMyProjectDetailed from "./pages/ViewMyProjectDetailed/ViewMyProjectDetailed";
import TopTeam from "./pages/TopTeam/TopTeam";
import AddTeam from "./pages/AddTeam/addTeam";
import MyTeam from "./pages/MyTeam/MyTeam";
import JoinTeam from "./pages/JoinTeam/JoinTeam";
import MyProfile from "./pages/MyProfile/MyProfile";


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // const { user } = useContext(UserContext);
  // const [username, setUsername] = useState(null);
  // const [password, setPassword] = useState(null);
  const [userID, setUserID] = useState(null);
  const [usertype, setUserType] = useState(null);

  const cookies = new Cookies();
  let userCookie = cookies.get("user");

  useEffect(() => {
    if (userCookie) {
      setUserID(userCookie.id);
      setUserType(userCookie.tipUtilizator);
      setisLoggedIn(true);
    } else {
    //   let OK = 0;
    //   let userInfo = null;

    //   setisLoggedIn(true);
    //   // window.location.href = "/Home";

    //   axios
    //     .get(
    //       `http://localhost:8080/api/utilizatori/verificareLogareUtilizator/${username}/${password}`
    //     )
    //     .then((response) => {
    //       console.log("Yeeeeeew!!");
    //       console.log(response.data);
    //       setisLoggedIn(true);
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //       setUserID(response.data.id);
    //       window.location.href = "/Home";
    //       cookies.set(
    //         "user",
    //         {
    //           ...response.data,
    //         },
    //         { path: "/", secure: true }
    //       );
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // Handle errors here
    //     });
      // user?.map((u) => {
      //   if (u.username == username && u.parola == password) {
      //     setisLoggedIn(true);
      //     localStorage.setItem("user", JSON.stringify(u));
      //     const user = localStorage.getItem("user");
      //     const userParse = JSON.parse(user);
      //     window.location.href = "/Home";
      //     userInfo = {
      //       id: userParse.id,
      //       userTeam: userParse.Echipe,
      //       usertype: userParse.tipUtilizator,
      //     };

      //     OK = 1;
      //     setUserID(userInfo.id);
      //   }

      //   cookies.set(
      //     "user",
      //     {
      //       ...userInfo,
      //     },
      //     { path: "/", secure: true }
      //   );
      // });
      // if (userInfo == null) {
      //   // window.location.href = "/";
      // }

      // if (OK == 0) {
      // }
    }
  }, []);

  const loginHandler = (dataUser) => {

      axios
        .get(
          `http://localhost:8080/api/utilizatori/verificareLogareUtilizator/${dataUser.userName}/${dataUser.userPassword}`
        )
        .then((response) => {
          console.log("Yeeeeeew!!");
          console.log(response.data);
          if(response.data!=="NuExista")
          {
            setisLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUserType(response.data.tipUtilizator);
            setUserID(response.data.id);
            window.location.href = "/Home";
            cookies.set(
              "user",
              {
                ...response.data,
              },
              { path: "/", secure: true }
            );
          }
          else{
            setisLoggedIn(false);
            window.location.href = "/";
            alert("Incorrect data entered!");
          }
          
        })
        .catch((error) => {
          console.error(error);
        });
     
  };

  const logoutHandler = () => {
    setisLoggedIn(false);
    cookies.remove("user");
  };


  console.log("VerificareeaaSup");
  console.log(usertype);

  return (
    <div className="app">
      <Router>
        <Navbar isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        {isLoggedIn ? (
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Companies" element={<Companies />} />
            <Route path="/Institutions" element={<Institutions />} />
            <Route path="/ProjectsCategory" element={<ProjectsCategory />} />
            <Route
              path="/ProjectsCategory/:categoryName"
              element={<AllProjectsSameCategory />}
            />
            <Route path="/AddProjects" element={<AddProjects />} />
            <Route
              path="/ProjectsCategory/:categoryName/:projectId"
              element={<ViewProjects />}
            />
            <Route
              path="/MyProjects"
              element={<MyProjects LoggedUserID={userID} usertype={usertype} />}
            />
            <Route
              path="/MyProjects/:projectId"
              element={<ViewMyProjectDetailed userType={usertype} />}
            />
            <Route path="/TopTeam" element={<TopTeam />} />
            <Route path="/AddTeam" element={<AddTeam />} />
            <Route path="/MyTeam" element={<MyTeam userId={userID} userType={usertype} />} />
            <Route path="/JoinTeam" element={<JoinTeam />} />
            <Route path="/MyProfile" element={<MyProfile />} />
          </Routes>
         ) : (
          <Routes>
            <Route path="/*" element={<Login doLogin={loginHandler} />} />
          </Routes>
        )
      }
      </Router>
    </div>
  );
}

export default App;
