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

type mapStatePropsType = {
    profilePage: {
        posts: Array<postsType>
        profile: profileType
        status: string
        isEditMode: boolean
    }
    userId: number
    isAuth: boolean
    router: any
}
type mapDispatchPropsType = {
    addPost: (newPostText: string) => baseActionType<typeof actions>
    deletePost: (id: number) => baseActionType<typeof actions>
    setEditMode: (mode: boolean) => baseActionType<typeof actions>
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (image: File) => void
    saveProfileData: (formData: profileType) => void
}
type propsType = mapStatePropsType & mapDispatchPropsType

class ProfileContainer extends React.Component <propsType> {
    refreshProfile() {
        let userId = this.props.router.params.userId
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
        return <Profile
            {...this.props}
            profilePage={this.props.profilePage}
            updateStatus={this.props.updateStatus}
            addPost={this.props.addPost}
            deletePost={this.props.deletePost}
            isOwner={!this.props.router.params.userId}
            savePhoto={this.props.savePhoto}
            saveProfileData={this.props.saveProfileData}
            setEditMode={this.props.setEditMode}
        />
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
        deletePost: actions.deletePost,
        setEditMode: actions.setEditMode,
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfileData
    }), withAuthRedirect, withRouter)(ProfileContainer)