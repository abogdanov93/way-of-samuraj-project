import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import "./App.css"
import {updatePostText} from "./state";

function App(props) {
    return (
        <div className="App">
            <Header/>
            <Navbar friends={props.state.friends}/>
            <div className="content">
                <Routes>
                    <Route path="/profile/*"
                           element={<Profile
                               profile={props.state.profile}
                               friends={props.state.friends}
                               addPost={props.addPost}
                               updatePostText={props.updatePostText}/>}/>
                    <Route path="/dialogs/*"
                           element={<Dialogs dialogs={props.state.dialogs}/>}/>
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
