import React, {FC} from "react"
import style from "./ProfileDataForm.module.css"
import {profileType} from "../../../types/types"
import {useDispatch} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"
import {actions, saveProfileData} from "../../../redux/profileReducer"
import {AnyAction} from "redux"
import {MyButton} from "../../common/MyButton/MyButton"

type propsType = { profile: profileType }
type Inputs = profileType

export const ProfileDataForm: FC<propsType> = ({profile}) => {

    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>({mode: "onBlur"})

    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(saveProfileData({
            userId: data.userId,
            fullName: data.fullName,
            lookingForAJob: data.lookingForAJob,
            lookingForAJobDescription: data.lookingForAJobDescription,
            aboutMe: data.aboutMe,
            contacts: {
                github: data.contacts.github,
                instagram: data.contacts.instagram,
                vk: data.contacts.vk,
                facebook: data.contacts.facebook,
                website: data.contacts.website,
                mainLink: data.contacts.mainLink,
                twitter: data.contacts.twitter,
                youtube: data.contacts.youtube
            },
            photos: data.photos
        }) as unknown as AnyAction)
    }

    const setEditMode = (isEditMode: boolean) => {
        dispatch(actions.setEditMode(isEditMode))
    }

    const deactivateEditMode = () => setEditMode(false)

    return <form onSubmit={handleSubmit(onSubmit)} className={style.profileDataForm}>

        <div>
            <h4>Your name:</h4>
            <input {...register("fullName")}/>
        </div>

        <div>
            <h4>Are you looking for a job now?</h4>
            <input {...register("lookingForAJob")}/>
        </div>

        <div>
            <h4>What job are you looking for?</h4>
            <input {...register("lookingForAJobDescription")}/>
        </div>

        <div>
            <h4>Write something about you:</h4>
            <input {...register("aboutMe")}/>
        </div>

        {/*<div className={style.contacts}>*/}
        {/*    <h4>Your contacts:</h4>*/}
        {/*    {Object*/}
        {/*        .keys(profile?.contacts)*/}
        {/*        .map(key => <div>*/}
        {/*            <input {...register(`contacts.${key}` as any, {required: "This field is required"})} placeholder={key}/></div>)}*/}
        {/*</div>*/}

        <div className={style.buttons}>
            <MyButton type="submit" disabled={!isValid}>Send</MyButton>
            <MyButton onClick={deactivateEditMode}>Return</MyButton>
        </div>
    </form>

}