import React, {FC, useEffect} from "react"
import style from "./Users.module.css"
import commonStyles from "./../../App.module.css"
import MyPagination from "../Utils/Pagination/MyPagination"
import User from "./User/User"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm"
import {filterType, followUser, requestUsers, unfollowUser} from "../../redux/reducers/usersReducer"
import Preloader from "../Utils/Preloader/Preloader"
import {useNavigate, useSearchParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"

const Users: FC = () => {

    const {users, filter, totalUsersCount, currentPageNumber, pageSize, isFetching, followingInProgress} =
        useAppSelector(state => state.usersPage)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const dispatch = useAppDispatch()

    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChange = (filter: filterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    // получает данные из url и отправляет их в redux
    useEffect(() => {
        // @ts-ignore
        const urlParams = Object.fromEntries([...searchParams])

        let urlCurrentPageNumber = currentPageNumber
        let urlFilter = filter

        if (urlParams.page) urlCurrentPageNumber = Number(urlParams.page)
        if (urlParams.term) urlFilter = {...filter, term: urlParams.term}
        if (urlParams.friend) urlFilter = {
            ...filter,
            friend: urlParams.friend === "null" ? null : urlParams.friend = !!"true"
        }

        dispatch(requestUsers(urlCurrentPageNumber, pageSize, urlFilter))
    }, [])

    // устанавливает в url данные из redux
    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friends=${filter.friend}&page=${currentPageNumber}`
        })
    }, [filter, currentPageNumber])

    return <div className={`${style.users} ${commonStyles.whiteBlock}`}>

        {isFetching && <Preloader/>}

        <UsersSearchForm onFilterChange={onFilterChange}/>

        {users.map(u => <User key={u.id}
                              user={u}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}/>
        )}

        <MyPagination totalItemsCount={totalUsersCount}
                      pageSize={pageSize}
                      currentPageNumber={currentPageNumber}
                      onPageChange={onPageChange}
                      className={style.pag}
        />

    </div>
}

export default Users