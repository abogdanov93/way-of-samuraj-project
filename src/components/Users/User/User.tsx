import React, {FC} from "react"
import userAvatar from "../../../uploads/images/userAvatar.jpeg"
import style from "./User.module.css"
import {NavLink} from "react-router-dom"
import {usersType} from "../../../types/types"
import {PrimaryButton} from "../../common/PrimaryButton/PrimaryButton";
import {SecondaryButton} from "../../common/SecondaryButton/SecondaryButton";

type propsType = {
    user: usersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
}

const User: FC<propsType> = ({user, follow, unfollow, followingInProgress}) => {


    return <div className={style.userPage}>

        <NavLink className={style.user} to={"/profile/" + user.id}>
            <img className={style.avatar} src={user.photos.small != null ? user.photos.small : userAvatar}/>
            <h4 className={style.name}>{user.name}</h4>
        </NavLink>

        <div className={style.button}>
            {user.followed
                ? <SecondaryButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow
                </SecondaryButton>

                : <SecondaryButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        follow(user.id)
                    }}>Follow
                </SecondaryButton>
            }
        </div>
    </div>
}

export default User