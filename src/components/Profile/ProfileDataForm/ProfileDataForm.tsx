import React, {FC} from "react"
import style from "./ProfileDataForm.module.css"
import {ProfileType} from "../../../types/types"
import {useDispatch} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"
import {actions, saveProfileData} from "../../../redux/reducers/profileReducer"
import {AnyAction} from "redux"
import {PrimaryButton} from "../../common/PrimaryButton/PrimaryButton"
import {SecondaryButton} from "../../common/SecondaryButton/SecondaryButton";
import {Switch} from "antd";

type Inputs = ProfileType


export const ProfileDataForm: FC = () => {

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(saveProfileData(data) as unknown as AnyAction)
    }
    const deactivateEditMode = () => dispatch(actions.setEditMode(false))


    return <form onSubmit={handleSubmit(onSubmit)} className={style.profileDataForm}>
        <h3>
            Edit profile information
        </h3>
        <div>
            <input {...register("fullName", {required: true})}
            placeholder="Your name"/>
            {errors.fullName && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("lookingForAJob", {required: true})}
            placeholder="Are you looking for a job?"/>

            {errors.lookingForAJob && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("lookingForAJobDescription", {required: true})}
                   placeholder="Your professional skills"/>
            {errors.lookingForAJobDescription && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("aboutMe", {required: true})}
                   placeholder="About you"/>
            {errors.aboutMe && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.github", {required: true})}
                   placeholder="Github"/>
            {errors.contacts?.github && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.vk", {required: true})}
                   placeholder="Vkontakte"/>
            {errors.contacts?.vk && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.facebook", {required: true})}
                placeholder="Facebook"/>
            {errors.contacts?.facebook && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.instagram", {required: true})}
                placeholder="Instagram"/>
            {errors.contacts?.instagram && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.twitter", {required: true})}
                placeholder="Twitter"/>
            {errors.contacts?.twitter && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.website", {required: true})}
                placeholder="Your website"/>
            {errors.contacts?.website && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.youtube", {required: true})}
                placeholder="Youtube"/>
            {errors.contacts?.youtube && <label>This field is required</label>}
        </div>

        <div>
            <input {...register("contacts.mainLink", {required: true})}
                placeholder="Main link"/>
            {errors.contacts?.mainLink && <label>This field is required</label>}
        </div>

        <div className={style.buttons}>
            <PrimaryButton type="submit">Edit</PrimaryButton>
            <SecondaryButton onClick={deactivateEditMode}>Reset</SecondaryButton>
        </div>

    </form>

}