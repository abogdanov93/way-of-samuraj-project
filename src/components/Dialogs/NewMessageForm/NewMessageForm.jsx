import React from "react";
import style from "./NewMessageForm.module.css";
import {Field, reduxForm} from "redux-form";
import {Element, Textarea} from "../../common/Textarea/Textarea";
import {maxLengthCreator, required} from "../../../utils/validators";

const maxLength10 = maxLengthCreator(10);

const NewMessageForm = (props) => {
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

const NewMessageFormHOC = reduxForm({form: "dialogNewMessageForm"})(NewMessageForm);
export default NewMessageFormHOC;