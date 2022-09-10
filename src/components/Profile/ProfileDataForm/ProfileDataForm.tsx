import React from "react"
import style from "../ProfileInfo/ProfileInfo.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Element} from "../../common/FormControl/FormControl"
import formStyle from "../../common/FormControl/FormControl.module.css"
import {profileType} from "../../../types/types"

type ownPropsType = {
        profile: profileType
}

const ProfileDataForm: React.FC<InjectedFormProps<profileType, ownPropsType> & ownPropsType> =
    ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={formStyle.errorWarning}>{error}</div>}
        <div>
            <Field component={Element}
                   name={"fullName"}
                   placeholder={"Your name"}
                   fieldType={"textarea"}/>
        </div>

        <div className={style.lookingForAJob}>
            Looking for a job: <Field component={"input"}
                                      name={"lookingForAJob"}
                                      type={"checkbox"}/>
        </div>

        <div className={style.jobDescription}>
            My professional skills: <Field component={Element}
                   name={"lookingForAJobDescription"}
                   placeholder={"Write something..."}
                   fieldType={"textarea"}/>
        </div>

        <div className={style.aboutMe}>
            About me: <Field component={Element}
                   name={"aboutMe"}
                   placeholder={"Write something..."}
                   fieldType={"textarea"}/>
        </div>

        <div className={style.contacts}>
            {Object
                .keys(profile.contacts)
                .map(key => <div key={key}>
                    {key}: <Field component={Element}
                                  name={"contacts." + key}
                                  placeholder={key}
                                  fieldType={"input"}/>
                </div>)}
        </div>

        <button>Save</button>
    </form>
}

const ProfileDataFormHOC = reduxForm<profileType, ownPropsType>({form: "editProfileData"})(ProfileDataForm)
export default ProfileDataFormHOC