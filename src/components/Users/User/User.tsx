import React from "react"
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

const User: React.FC < propsType > = ({user, follow, unfollow, followingInProgress}) => {
    return <div className={style.user}>

        <NavLink to={"/profile/" + user.id}>

            <div>
                <img className={style.avatar} src={user.photos.small != null ? user.photos.small : userAvatar}/>
            </div>

            <div>
                {user.name}
            </div>

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