import React from "react"
import {connect} from "react-redux"
import Dialogs from "./Dialogs"
import {actions} from "../../redux/dialogsReducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {stateType} from "../../redux/reduxStore"

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogs
    }
}

export default compose<React.ComponentType>(connect
    (mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect)(Dialogs)