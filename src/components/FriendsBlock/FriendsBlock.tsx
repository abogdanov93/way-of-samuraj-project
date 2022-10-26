import React, {FC, useEffect} from "react"
import style from "./FriendsBlock.module.css"
import commonStyles from "./../../App.module.css"
import {useDispatch} from "react-redux"
import {requestFriends} from "../../redux/reducers/friendsSlice"
import {AnyAction} from "redux"
import userAvatar from "../../uploads/images/userAvatar.jpeg"
import {NavLink, useNavigate} from "react-router-dom"
import {requestUsers} from "../../redux/reducers/usersReducer"
import Preloader from "../common/Preloader/Preloader"
import {useAppSelector} from "../../hooks/redux"
import {Error} from "../common/Error/Error"
import {SecondaryButton} from "../common/SecondaryButton/SecondaryButton";

const FriendsBlock: FC = () => {

    const {friends, isLoading, error} = useAppSelector(state => state.friends)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestFriends() as unknown as AnyAction)
    }, [])

    // todo: ререндер при добавлении и удалении друга
    // useEffect(() => {
    //     dispatch(requestFriends() as unknown as AnyAction)
    // }, [friends.length])

    const showFriends = () => {
        navigate("/users")
        dispatch(requestUsers(1, 5, {term: "", friend: true}) as unknown as AnyAction)
    }

    const searchFriends = () => {
        navigate("/users")
        dispatch(requestUsers(1, 5, {term: "", friend: null}) as unknown as AnyAction)
    }

    return <div className={`${style.friendsBlock} ${commonStyles.whiteBlock}`}>
        <div className={style.title}>
            <h3>Friends</h3>
            <h4 onClick={showFriends}>Show all</h4>
        </div>

        <div className={style.friends}>
            {isLoading && <Preloader style={{width: "50px", marginTop: "30%"}}/>}
            {error && <Error error={error}/>}
            {friends.length === 0 && !error && !isLoading && <div className={style.noFriendsMessage}>
                <h4>You don't have friends yet. Search for new friends</h4>
                <SecondaryButton onClick={searchFriends}>Search</SecondaryButton>
            </div>}

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