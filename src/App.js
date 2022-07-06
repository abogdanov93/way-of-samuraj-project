import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import Navbar from "./Navbar";
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
