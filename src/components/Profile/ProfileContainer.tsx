import React from "react"
import {connect} from "react-redux"
import Profile from "./Profile"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {
    actions,
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfileData,
    updateStatus
} from "../../redux/profileReducer"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {baseActionType, stateType} from "../../redux/reduxStore"
import {postsType, profileType} from "../../types/types"


class ProfileContainer extends React.Component  {

    refreshProfile() {
        let userId: number | null = this.props.router.params.userId
        if (!userId) {
            userId = this.props.userId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: propsType, prevState: propsType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        // @ts-ignore
        return <Profile isOwner={!this.props.router.params.userId}/>
    }
}

const mapStateToProps = (state: stateType) => {
    return {
        profilePage: state.profilePage,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    } as mapStatePropsType
}

function withRouter(Component: React.ComponentType) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        )
    }

    return ComponentWithRouterProp
}

export default compose<React.ComponentType>(
    connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
    (mapStateToProps, {
        addPost: actions.addPost,
        setEditMode: actions.setEditMode,
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfileData
    }), withAuthRedirect, withRouter)(ProfileContainer)