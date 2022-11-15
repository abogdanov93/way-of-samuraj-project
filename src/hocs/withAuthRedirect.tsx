import React, {FC} from "react"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {getIsAuth} from "../redux/selectors/loginSelectors"


export const WithAuthRedirect = (Component: React.FC) => {

    const Container: FC = (props) => {

        const isAuth = useSelector(getIsAuth)

        if (!isAuth) {
            return <Navigate to="/login"/>
        } else {
            return <Component {...props}/>
        }
    }
    return Container
}

