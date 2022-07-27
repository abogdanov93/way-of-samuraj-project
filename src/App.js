import React from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import FriendsBlock from "./components/FriendsBlock/FriendsBlock";


function App() {
    return (
        <div className="App">
            <HeaderContainer/>
            <Navbar/>
            <FriendsBlock/>
            <div className="content">
                <Routes>
                    <Route path="/profile/*"
                           element={<ProfileContainer/>}/>
                    <Route path="/profile/:userId*"
                           element={<ProfileContainer/>}/>
                    <Route path="/dialogs/*"
                           element={<DialogsContainer/>}/>
                    <Route path="/users/*"
                           element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
