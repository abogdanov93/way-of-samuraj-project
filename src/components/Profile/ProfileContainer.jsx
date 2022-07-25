import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {addPost, setUserProfile, updatePostText} from "../../redux/profileReducer";
import axios from "axios";

class ProfileContainer extends React.Component {
    componentDidMount() {
        // this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                // this.props.toggleIsFetching(false);
                this.props.setUserProfile(response.data);
            });
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, {addPost, updatePostText, setUserProfile})(ProfileContainer);