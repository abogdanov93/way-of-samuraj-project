import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {addPost, getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        debugger
        if (!userId) {
            userId = this.props.userId;
            // if(!userId){
            //     // this.props.router.location.pathname = "/login";
            //     this.props.history.push("/login");
            // }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <Profile
            {...this.props}
            profilePage={this.props.profilePage}
            updateStatus={this.props.updateStatus}
            addPost={this.props.addPost}
            />
    }
}

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose(
    connect(mapStateToProps, {
        addPost,
        getUserProfile,
        getStatus,
        updateStatus
    }), withAuthRedirect, withRouter)(ProfileContainer);