import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addMessage, updateMessageText} from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}

const DialogsContainer = connect(mapStateToProps, {addMessage, updateMessageText})(Dialogs);

export default DialogsContainer;