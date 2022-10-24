import React, {FC, useEffect} from "react"
import style from "./FriendsBlock.module.css"
import commonStyles from "./../../App.module.css"
import {useDispatch, useSelector} from "react-redux"
import {requestFriends} from "../../redux/reducers/friendsSlice"
import {AnyAction} from "redux"
import {getFriends} from "../../redux/selectors/friendsSelectors"
import userAvatar from "../../uploads/images/userAvatar.jpeg"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import {requestUsers} from "../../redux/reducers/usersReducer";

const FriendsBlock: FC = () => {

    const friends = useSelector(getFriends)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestFriends() as unknown as AnyAction)
    }, [])

    const showFriends = () => {
        navigate("/users?term=&friends=true&page=1")
        dispatch(requestUsers(1, 5,  {term: "", friend: true}) as unknown as AnyAction)
    }

    return <div className={`${style.friendsBlock} ${commonStyles.whiteBlock}`}>
        <div className={style.title}>
            <h3>Friends</h3>
            <h4 onClick={showFriends}>Show all</h4>
        </div>
        <div className={style.friends}>
            {friends
                .slice(0, 5)
                .map(f => <NavLink to={"/profile/" + f.id} key={f.id} className={style.friend}>
                    <img className={style.avatar} src={f.photos.small != null ? f.photos.small : userAvatar}/>
                    <h4>{f.name}</h4>
                </NavLink>)
            }
        </div>
    </div>
}

export default FriendsBlock