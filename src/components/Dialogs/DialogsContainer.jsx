import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addMessage, updateMessageText} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}

export default compose(
    connect(mapStateToProps, {addMessage, updateMessageText}),
    withAuthRedirect)(Dialogs);