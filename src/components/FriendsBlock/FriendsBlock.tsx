import React, {FC, useEffect} from "react"
import style from "./FriendsBlock.module.css"
import commonStyles from "./../../App.module.css"
import {useDispatch, useSelector} from "react-redux"
import {requestFriends} from "../../redux/reducers/friendsSlice"
import {AnyAction} from "redux"
import {getFriends} from "../../redux/selectors/friendsSelectors"
import userAvatar from "../../images/userAvatar.jpeg"
import {NavLink} from "react-router-dom"

const FriendsBlock: FC = () => {

    const friends = useSelector(getFriends)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestFriends() as unknown as AnyAction)
    }, [])

    return <div className={`${style.friendsBlock} ${commonStyles.whiteBlock}`}>
        <h3>Friends</h3>
        <div className={style.friends}>
            {friends.map(f => <NavLink to={"/profile/" + f.id} key={f.id} className={style.friend}>
                <img className={style.avatar} src={f.photos.small != null ? f.photos.small : userAvatar}/>
                <h4>{f.name}</h4>
            </NavLink>)
            }
        </div>
    </div>
}

export default FriendsBlock