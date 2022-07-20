import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addMessageAC, updateMessageTextAC} from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageAC());
        },
        updateMessageText: (text) => {
            dispatch(updateMessageTextAC(text));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;