import React, {FC} from "react"
import userAvatar from "../../../images/userAvatar.jpeg"
import style from "./User.module.css"
import {NavLink} from "react-router-dom"
import {usersType} from "../../../types/types"
import {MyButton} from "../../common/MyButton/MyButton";

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
                ? <MyButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow
                </MyButton>

                : <MyButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        follow(user.id)
                    }}>Follow
                </MyButton>
            }
        </div>
    </div>
}

export default User