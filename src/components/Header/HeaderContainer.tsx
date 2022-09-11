import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {logOut} from "../../redux/authReducer"
import {stateType} from "../../redux/reduxStore"

type mapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchPropsType = {
    logOut: () => void
}

class HeaderContainer extends React.Component <mapStatePropsType & mapDispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
(mapStateToProps, {logOut})(HeaderContainer)