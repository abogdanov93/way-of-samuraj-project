import React from "react"
import style from "./NewPostForm.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../utils/validators"
import {Element} from "../../common/FormControl/FormControl"
import {newPostFormDataType} from "../Profile"

type ownPropsType = {}

const maxLength5 = maxLengthCreator(5)

const NewPostForm: React.FC<InjectedFormProps<newPostFormDataType, ownPropsType> & ownPropsType> =
    (props) => {
    debugger
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
        )
    }

export const NewPostFormHOC = reduxForm<newPostFormDataType, ownPropsType>({form: "profileNewPostForm"})(NewPostForm)
export default NewPostFormHOC