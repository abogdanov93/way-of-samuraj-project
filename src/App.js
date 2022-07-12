import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import Dialogs from "./Dialogs/Dialogs";
import "./App.css"

function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route path="/profile/*"
                               element={<Profile state={props.state.profile}/>}/>
                        <Route path="/dialogs/*"
                               element={<Dialogs state={props.state.dialogs}/>}/>
                        <Route path="/communities/*"
                               element={<Dialogs/>}/>
                        <Route path="/news/*"
                               element={<Dialogs/>}/>
                        <Route path="/settings/*"
                               element={<Dialogs/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
