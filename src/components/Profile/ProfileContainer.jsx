import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {addPost, getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 18397
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
        profilePage: state.profilePage
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
    }), withRouter)(ProfileContainer);