import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import FriendsBlock from "./components/FriendsBlock/FriendsBlock";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import "./App.css";
import Friends from "./components/Friends/Friends";

function App() {
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <FriendsBlock/>
            <div className="content">
                <Routes>
                    <Route path="/profile/*"
                           element={<ProfileContainer/>}/>
                    <Route path="/dialogs/*"
                           element={<DialogsContainer/>}/>
                    <Route path="/friends/*"
                           element={<Friends/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
