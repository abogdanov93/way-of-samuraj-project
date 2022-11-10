import React, {FC} from 'react'
import ProfileStatus from "../../ProfileStatus/ProfileStatus"
import {Contact} from "../Contact/Contact"
import {ContactsType} from "../../../../types/types"
import {profileSlice} from "../../../../redux/reducers/profileSlice"
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux"
import style from "./ProfileData.module.css"
import {updateStatusThunk} from "../../../../redux/actions/profileActions"

type PropsType = {
    isOwner: boolean
    className: any
}

export const ProfileData: FC<PropsType> = ({isOwner}) => {

    const {profile, status} = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()

    const updateStatus = (status: string) => dispatch(updateStatusThunk(status))
    const setEditMode = (isEditMode: boolean) => dispatch(profileSlice.actions.setEditMode(isEditMode))
    const activateEditMode = () => setEditMode(true)

    return <div className={style.profileData}>

        {isOwner && <div onClick={activateEditMode} className={style.edit}>Edit</div>}
        <h1>{profile?.fullName}</h1>

        <div className={style.status}>
            <ProfileStatus
                status={status}
                updateStatus={updateStatus}/>
        </div>

        <div className={style.jobDescription}>
            <h4>My professional skills:</h4>
            {profile?.lookingForAJobDescription}
        </div>

        <div className={style.aboutMe}>
            <h4>About me:</h4>
            {profile?.aboutMe}
        </div>

        <div className={style.contacts}>
            {Object
                .keys(profile?.contacts as any).map(key =>
                    <Contact key={key} name={key} link={profile?.contacts[key as keyof ContactsType]}/>)}
        </div>
    </div>
}