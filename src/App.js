import React from "react";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import "./App.css"

function App() {
    return (
        <div className="App">
            <div className="header"><Header /></div>
            <div className="profile"><Profile /></div>
            <div className="navbar"><Navbar /></div>
        </div>
    );
}

export default App;
