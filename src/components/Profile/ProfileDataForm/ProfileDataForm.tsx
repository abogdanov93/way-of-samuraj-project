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
            contacts: data.contacts,
            photos: data.photos
        }) as unknown as AnyAction)
    }
    const setEditMode = (isEditMode: boolean) => {
        dispatch(actions.setEditMode(isEditMode))
    }
    const deactivateEditMode = () => setEditMode(false)

    return <form onSubmit={handleSubmit(onSubmit)} className={style.profileDataForm}>

        <div className={style.fullName}>
            <h4>Your name:</h4>
            <input {...register("fullName", {
                maxLength: {value: 30, message: "The length of message must be 30 characters or fewer."}
            })}/>
            {errors?.fullName && <div className={style.error}>{errors?.fullName?.message}</div>}
        </div>

        <div className={style.lookingForAJob}>
            <h4>Are you looking for a job now?</h4>
            <input {...register("lookingForAJob")}/>
            {errors?.lookingForAJob && <div className={style.error}>{errors?.lookingForAJob?.message}</div>}
        </div>

        <div className={style.jobDescription}>
            <h4>What job are you looking for?</h4>
            <input {...register("lookingForAJobDescription",
                {maxLength: {value: 300, message: "The length of message must be 300 characters or fewer."}})}/>
            {errors?.lookingForAJobDescription &&
                <div className={style.error}>{errors?.lookingForAJobDescription?.message}</div>}
        </div>

        <div className={style.aboutMe}>
            <h4>Write something about you:</h4>
            <input {...register("aboutMe",
                {maxLength: {value: 300, message: "The length of message must be 300 characters or fewer."}})}/>
            {errors?.aboutMe && <div className={style.error}>{errors?.aboutMe?.message}</div>}
        </div>

        {/*<div className={style.contacts}>Your contacts:*/}
        {/*    {profile.contacts*/}
        {/*        .map(key => <input {...register(`contacts."${key}` as any)} placeholder={key}/>)*/}
        {/*    }*/}
        {/*</div>*/}
<div className={style.buttons}>
            <MyButton type="submit" disabled={!isValid}>Send</MyButton>
            <MyButton onClick={deactivateEditMode}>Return</MyButton>
</div>


    </form>

}