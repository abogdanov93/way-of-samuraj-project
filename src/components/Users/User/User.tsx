import React, {FC} from "react"
import userAvatar from "../../../uploads/images/userAvatar.jpeg"
import style from "./User.module.css"
import {NavLink} from "react-router-dom"
import {UsersType} from "../../../types/types"
import {MySecondaryButton} from "../../Utils/MySecondaryButton/MySecondaryButton"
import {followUser, unfollowUser} from "../../../redux/actions/usersActions"
import {useAppDispatch} from "../../../hooks/redux"

type propsType = {
    user: UsersType
    followingInProgress: Array<number>
}

const User: FC<propsType> = ({user, followingInProgress}) => {

    const dispatch = useAppDispatch()
    const follow = (userId: number) => dispatch(followUser(userId))
    const unfollow = (userId: number) => dispatch(unfollowUser(userId))

    return <div className={style.userPage}>

        <NavLink className={style.user} to={"/profile/" + user.id}>
            <img className={style.avatar} src={user.photos.small != null ? user.photos.small : userAvatar}/>
            <h4 className={style.name}>{user.name}</h4>
        </NavLink>

        <div className={style.button}>
            {user.followed
                ? <MySecondaryButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow
                </MySecondaryButton>

                : <MySecondaryButton
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        follow(user.id)
                    }}>Follow
                </MySecondaryButton>
            }
        </div>
    </div>
}

export default User