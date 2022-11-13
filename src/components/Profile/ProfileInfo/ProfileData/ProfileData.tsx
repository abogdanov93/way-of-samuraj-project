import React, {FC} from 'react'
import {Contact} from "../Contact/Contact"
import {ContactsType} from "../../../../types/types"
import {useAppSelector} from "../../../../hooks/redux"
import style from "./ProfileData.module.css"

type PropsType = {
    isOwner: boolean
    className: any
}

export const ProfileData: FC<PropsType> = ({isOwner}) => {

    const {profile} = useAppSelector(state => state.profilePage)

    return <div className={style.profileData}>

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