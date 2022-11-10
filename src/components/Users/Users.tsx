import React, {FC, useEffect} from "react"
import style from "./Users.module.css"
import commonStyles from "./../../App.module.css"
import MyPagination from "../Utils/Pagination/MyPagination"
import User from "./User/User"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm"
import {filterType, requestUsers, followUser, unfollowUser} from "../../redux/reducers/usersReducer"
import {useDispatch} from "react-redux"
import Preloader from "../Utils/Preloader/Preloader"
import {AnyAction} from "redux"
import {useNavigate, useSearchParams} from "react-router-dom"
import {useAppSelector} from "../../hooks/redux"

const Users: FC = () => {

    const {users, filter, totalUsersCount, currentPageNumber, pageSize, isFetching, followingInProgress} =
        useAppSelector(state => state.usersPage)

    const dispatch = useDispatch()

    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
    }
    const onFilterChange = (filter: filterType) => {
        dispatch(requestUsers(1, pageSize, filter) as unknown as AnyAction)
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId) as unknown as AnyAction)
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId) as unknown as AnyAction)
    }

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

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
            friend: urlParams.friend === "null" ? null : urlParams.friend = "true" ? true : false
        }

        dispatch(requestUsers(urlCurrentPageNumber, pageSize, urlFilter) as unknown as AnyAction)
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

        <div>
            <UsersSearchForm onFilterChange={onFilterChange}/>
        </div>

        <div>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  follow={follow}
                                  unfollow={unfollow}
                                  followingInProgress={followingInProgress}/>
            )}
        </div>

        <MyPagination totalItemsCount={totalUsersCount}
                      pageSize={pageSize}
                      currentPageNumber={currentPageNumber}
                      onPageChange={onPageChange}
        />

    </div>
}

export default Users