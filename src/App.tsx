import React, {FC, useEffect} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Provider, useDispatch, useSelector} from "react-redux"
import 'antd/dist/antd.css'
import commonStyles from "./App.module.css"
import {initializeApp} from "./redux/reducers/appSlice"
import Navbar from "./components/Navbar/Navbar"
import FriendsBlock from "./components/FriendsBlock/FriendsBlock"
import Preloader from "./components/common/Preloader/Preloader"
import Header from "./components/Header/Header"
import {getInitialized} from "./redux/selectors/appSelectors"
import {AnyAction} from "redux"
import {store} from "./redux/store"

const Profile = React.lazy(() => import("./components/Profile/Profile"))
const Users = React.lazy(() => import("./components/Users/Users"))
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const Chat = React.lazy(() => import("./components/Chat/Chat"))
const Login = React.lazy(() => import("./components/Login/Login"))


const App: FC = () => {
    const initialized = useSelector(getInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp() as unknown as AnyAction)
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return <div className={commonStyles.App}>
            <Header/>
            <Navbar/>
        <div className={commonStyles.friends}>
            <FriendsBlock/>
        </div>
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
}


const AppRouter: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}

export default AppRouter