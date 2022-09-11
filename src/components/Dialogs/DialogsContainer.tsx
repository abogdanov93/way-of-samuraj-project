import React from "react"
import {connect} from "react-redux"
import Dialogs from "./Dialogs"
import {actions, initialStateType} from "../../redux/dialogsReducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {baseActionType, stateType} from "../../redux/reduxStore"

type mapStatePropsType = {
    dialogs: initialStateType
}
type mapDispatchPropsType = {
    addMessage: (newMessageText: string) => baseActionType<typeof actions>
}

const DialogsContainer: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
    return <Dialogs dialogs={props.dialogs} addMessage={props.addMessage}/>
}

const mapStateToProps = (state: stateType) => {
    return {
        dialogs: state.dialogs
    }
}

export default compose<React.ComponentType>(connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
    (mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect)(DialogsContainer)