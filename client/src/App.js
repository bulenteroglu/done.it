import React, { useState, useEffect } from "react";
import "./styles/main.css";
import Login from "./components/Authentication/Login";
import "./App.css";
import Homepage from "./components/Authentication/Homepage";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Axios from "axios";
import UserContext from "./context/UserContext";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await Axios.post("/users/tokenIsValid", null, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (tokenResponse.data) {
        const userResponse = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="h-screen">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/tasks">
              <Tasks />
            </Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
