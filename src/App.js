import React from "react";
import {Route, Routes} from "react-router-dom";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import FriendsBlock from "./components/FriendsBlock/FriendsBlock";
import commonStyles from "./App.module.css";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={commonStyles.App}>
                <HeaderContainer/>
                <Navbar/>
                <FriendsBlock/>
                <div className={commonStyles.content}>
                    <React.Suspense fallback={<Preloader/>}>
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
                    </React.Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default connect(mapStateToProps, {initializeApp})(App);
