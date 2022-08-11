import React from "react";
import {Route, Routes} from "react-router-dom";
import commonStyles from "./App.module.css";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import FriendsBlock from "./components/FriendsBlock/FriendsBlock";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }
        return (
            <div className={commonStyles.App}>
                <HeaderContainer/>
                <Navbar/>
                <FriendsBlock/>
                <div className={commonStyles.content}>
                    <Routes>
                        <Route path="/profile/*"
                               element={<ProfileContainer/>}/>
                        <Route path="/profile/:userId/*"
                               element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*"
                               element={<DialogsContainer/>}/>
                        <Route path="/users/*"
                               element={<UsersContainer/>}/>
                        <Route path="/login/*"
                               element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized
});

export default connect(mapStateToProps, {initializeApp})(App);
