import React from "react"
import {Navigate} from "react-router-dom"
import {connect} from "react-redux"
import {stateType} from "../redux/reduxStore"
import {jsx} from "@emotion/react"
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes // неизвестная херня, webStorm предложил, все заработало

type mapStatePropsType = {
    isAuth: boolean
}
type mapDispatchPropsType = {}

let mapStateToProps = (state: stateType) => ({
   isAuth: state.auth.isAuth
} as mapStatePropsType)

export function withAuthRedirect<OwnPropsType extends IntrinsicAttributes> (Component: React.ComponentType<OwnPropsType>) {
    const RedirectComponent: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Navigate to="/login/*"/>
        return <Component {...restProps as OwnPropsType} />
    }

    return connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, stateType>(
        mapStateToProps, {})(RedirectComponent)
}