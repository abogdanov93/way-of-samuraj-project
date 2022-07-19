import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        updateMessageText: (text) => {
            dispatch(updateMessageTextActionCreator(text));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;