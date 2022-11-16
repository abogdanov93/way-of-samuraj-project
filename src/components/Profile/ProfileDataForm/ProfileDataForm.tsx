import React, {FC} from "react"
import style from "./ProfileDataForm.module.css"
import {ProfileType} from "../../../types/types"
import {SubmitHandler, useForm} from "react-hook-form"
import {profileSlice} from "../../../redux/reducers/profileSlice"
import {MyPrimaryButton} from "../../Utils/MyPrimaryButton/MyPrimaryButton"
import {MySecondaryButton} from "../../Utils/MySecondaryButton/MySecondaryButton"
import {saveProfileDataThunk} from "../../../redux/actions/profileActions"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux"

/* IMPLEMENTED WITH REACT HOOK FORM */

type Inputs = ProfileType

export const ProfileDataForm: FC = () => {

    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profilePage.profile)

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(saveProfileDataThunk(data))
    }
    const deactivateEditMode = () => dispatch(profileSlice.actions.setEditMode(false))


    return <form onSubmit={handleSubmit(onSubmit)} className={style.profileDataForm}>
        <h3>
            Edit profile information
        </h3>
        <div>
            <input {...register("fullName", {required: true})}
                   placeholder="Your name"
                   defaultValue={profile?.fullName}/>
            {errors.fullName && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("lookingForAJob", {required: true})}
                   placeholder="Are you looking for a job?"
                   defaultValue={profile?.lookingForAJob.toString()}/>

            {errors.lookingForAJob && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("lookingForAJobDescription", {required: true})}
                   placeholder="Your professional skills"
                   defaultValue={profile?.lookingForAJobDescription}/>
            {errors.lookingForAJobDescription && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("aboutMe", {required: true})}
                   placeholder="About you"
                   defaultValue={profile?.aboutMe}/>
            {errors.aboutMe && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.github", {required: true})}
                   placeholder="Github"
                   defaultValue={profile?.contacts.github}/>
            {errors.contacts?.github && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.vk", {required: true})}
                   placeholder="Vkontakte"
                   defaultValue={profile?.contacts.vk}/>
            {errors.contacts?.vk && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.facebook", {required: true})}
                   placeholder="Facebook"
                   defaultValue={profile?.contacts.facebook}/>
            {errors.contacts?.facebook && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.instagram", {required: true})}
                   placeholder="Instagram"
                   defaultValue={profile?.contacts.instagram}/>
            {errors.contacts?.instagram && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.twitter", {required: true})}
                   placeholder="Twitter"
                   defaultValue={profile?.contacts.twitter}/>
            {errors.contacts?.twitter && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.website", {required: true})}
                   placeholder="Your website"
                   defaultValue={profile?.contacts.website}/>
            {errors.contacts?.website && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.youtube", {required: true})}
                   placeholder="Youtube"
                   defaultValue={profile?.contacts.youtube}/>
            {errors.contacts?.youtube && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.mainLink", {required: true})}
                   placeholder="Main link"
                   defaultValue={profile?.contacts.mainLink}/>
            {errors.contacts?.mainLink && <label>This field is required</label>}
        </div>

        <div className={style.buttons}>
            <MyPrimaryButton type="submit">Edit</MyPrimaryButton>
            <MySecondaryButton onClick={deactivateEditMode}>Reset</MySecondaryButton>
        </div>

    </form>

}