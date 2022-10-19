import React, {FC} from "react"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {getIsAuth} from "../redux/selectors/loginSelectors"


export const WithAuthRedirect = (Component: React.ComponentType) => {
    const isAuth = useSelector(getIsAuth)
    const Container: FC = (props) => {
        if(!isAuth) return <Navigate to="/login"/>
        return <Component {...props}/>
    }
    return Container
}


//
// export function withAuthRedirect<OwnPropsType> (Component: React.ComponentType<OwnPropsType>) {
//     const Container: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
//         let {isAuth, ...restProps} = props
//         if (!props.isAuth) return <Navigate to="/login/*"/>
//         return <Component {...restProps as any} />
//     }
//
//     return connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, stateType>(
//         mapStateToProps, {})(Container)
// }