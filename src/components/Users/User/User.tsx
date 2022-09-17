import React, {FC} from "react"
import userAvatar from "../../../images/userAvatar.jpeg"
import style from "./User.module.css"
import {NavLink} from "react-router-dom"
import {usersType} from "../../../types/types"

type propsType = {
    user: usersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
}

const User: FC < propsType > = ({user, follow, unfollow, followingInProgress}) => {


    return <div className={style.user}>
        <NavLink to={"/profile/" + user.id}>
                <img className={style.avatar} src={user.photos.small != null ? user.photos.small : userAvatar}/>
                {user.name}
        </NavLink>

        <div>
            {user.followed
                ? <button
                    disabled={followingInProgress.some( (id: number) => id === user.id)}
                    onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow
                </button>

                : <button
                    disabled={followingInProgress.some( (id: number) => id === user.id)}
                    onClick={() => {
                        follow(user.id)
                    }}>Follow
                </button>
            }
        </div>
    </div>
}

export default User