import React, {FC} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {connect, Provider} from "react-redux"
import 'antd/dist/antd.css'
import commonStyles from "./App.module.css"
import store, {stateType} from "./redux/reduxStore"
import {initializeApp} from "./redux/appReducer"
import Navbar from "./components/Navbar/Navbar"
import FriendsBlock from "./components/FriendsBlock/FriendsBlock"
import Preloader from "./components/common/Preloader/Preloader"
import Header from "./components/Header/Header"

const Profile = React.lazy(() => import("./components/Profile/Profile"))
const Users = React.lazy(() => import("./components/Users/Users"))
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const Chat = React.lazy(() => import("./components/Chat/Chat"))
const Login = React.lazy(() => import("./components/Login/Login"))

type mapPropsType = {
    initialized: boolean
}
type dispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component <mapPropsType & dispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={commonStyles.App}>
                <Header/>
                <Navbar/>
                <FriendsBlock/>
                <div className={commonStyles.content}>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path="/profile/*"
                                   element={<Profile/>}/>
                            <Route path="*"
                                   element={<Profile/>}/>
                            <Route path="/profile/:userId/*"
                                   element={<Profile/>}/>
                            <Route path="/users/*"
                                   element={<Users/>}/>
                            <Route path="/dialogs/*"
                                   element={<Dialogs/>}/>
                            <Route path="/chat/*"
                                   element={<Chat/>}/>
                            <Route path="/login"
                                   element={<Login/>}/>
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: stateType) => ({
    initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, {initializeApp})(App)

const MainAppComponent: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainAppComponent