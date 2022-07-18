import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import "./App.css"
import FriendsBlock from "./components/FriendsBlock/FriendsBlock";

function App(props) {
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <FriendsBlock store={props.store}/>
            <div className="content">
                <Routes>
                    <Route path="/profile/*"
                           element={<Profile store={props.store}/>}/>
                    <Route path="/dialogs/*"
                           element={<Dialogs store={props.store}/>}/>
                    <Route path="/communities/*"
                           element={<Dialogs/>}/>
                    <Route path="/news/*"
                           element={<Dialogs/>}/>
                    <Route path="/settings/*"
                           element={<Dialogs/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
