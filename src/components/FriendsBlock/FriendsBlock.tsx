import React, {FC, useEffect} from "react"
import style from "./FriendsBlock.module.css"
import commonStyles from "./../../App.module.css"
import userAvatar from "../../uploads/images/userAvatar.jpeg"
import {NavLink, useNavigate} from "react-router-dom"
import MyPreloader from "../Utils/MyPreloader/MyPreloader"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {MyErrorMessage} from "../Utils/MyErrorMessage/MyErrorMessage"
import {MySecondaryButton} from "../Utils/MySecondaryButton/MySecondaryButton"
import {fetchFriendsThunk} from "../../redux/actions/friendsActions"
import {fetchUsers} from "../../redux/actions/usersActions"

const FriendsBlock: FC = () => {

    const {friends, isLoading, error} = useAppSelector(state => state.friends)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchFriendsThunk())
    }, [])

    useEffect(() => {
        dispatch(fetchFriendsThunk())
    }, [isAuth])

    const showFriends = (friend: true | false | undefined) => {
        navigate("/users")
        dispatch(fetchUsers(1, 5, {term: "", friend: friend}))
    }

    return <div className={`${style.friendsBlock} ${commonStyles.whiteBlock}`}>
        <div className={style.title}>
            <h3>Friends</h3>
            <h4 onClick={ () => showFriends(true)}>Show all</h4>
        </div>

        <div className={style.friends}>

            {isLoading && <MyPreloader style={{width: "50px", marginTop: "30%"}}/>}
            {error && <MyErrorMessage error={error}/>}
            {friends.length === 0 && !error && !isLoading &&
                <div className={style.noFriendsMessage}>
                    <h4>You don't have friends yet. Search for new friends</h4>
                    <MySecondaryButton onClick={ () => showFriends(undefined) }>Search</MySecondaryButton>
                </div>
            }

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