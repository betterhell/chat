import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import Registration from "./components/Registration/Registration";

import { useUserStore } from "./store/user.store";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import { User } from "./models/user.model";
import socket from "./socket";
import { io } from "socket.io-client";

const App = () => {
  const { checkAuth, isAuth, user } = useUserStore();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    socket.on("user:responseUsers", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("user:responseUsers");
    };
  }, [socket]);

  useEffect(() => {
    socket.connect();

    if (user) {
      socket.emit("user:connect", user);
    }
    return () => {
      socket.off("user:connect");
    };
  }, [socket, user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/chat" element={<Chat users={users} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
