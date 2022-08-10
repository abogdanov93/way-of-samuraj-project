import React from "react";
import style from "./NewPostForm.module.css";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Element, Textarea} from "../../common/FormControl/FormControl";

const maxLength5 = maxLengthCreator(5);

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.newPost}>
            <div className={style.textarea}>
                <Field component={Element}
                       name={"newPostText"}
                       placeholder={"Write a post..."}
                       validate={[required, maxLength5]}
                       fieldType={"textarea"}
                />
            </div>
            <div className={style.button}>
                <button>Post</button>
            </div>
        </form>
    );
}

const NewPostFormHOC = reduxForm({form: "profileNewPostForm"})(NewPostForm);
export default NewPostFormHOC;