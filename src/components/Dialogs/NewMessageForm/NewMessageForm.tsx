import React from "react"
import style from "./NewMessageForm.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Element} from "../../common/FormControl/FormControl"
import {maxLengthCreator, required} from "../../../utils/validators"
import {formDataType} from "../Dialogs"

type propsType = {}

const maxLength10 = maxLengthCreator(10)

const NewMessageForm: React.FC<InjectedFormProps<formDataType, propsType> & propsType> =
    (props) => {
        return (
            <form onSubmit={props.handleSubmit} className={style.newMessage}>
                <div className={style.textarea}>
                    <Field component={Element}
                           name={"newMessageText"}
                           placeholder={"Write a message..."}
                           validate={[required, maxLength10]}
                           fieldType={"textarea"}
                    />
                </div>
                <div className={style.button}>
                    <button>Post</button>
                </div>
            </form>
        )
    }

const NewMessageFormHOC = reduxForm<formDataType, propsType>({form: "dialogNewMessageForm"})(NewMessageForm)
// @ts-ignore
export default NewMessageFormHOC