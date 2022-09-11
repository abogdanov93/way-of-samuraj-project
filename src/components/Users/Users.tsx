import React, {FC} from "react"
import style from "./Users.module.css"
import commonStyles from "./../../App.module.css"
import Pagination from "../common/Pagination/Pagination"
import User from "./User/User"
import {usersType} from "../../types/types"

type propsType = {
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPageNumber: number
    onPageChange: (pageNumber: number) => void
    users: Array<usersType>
}

const Users: FC<propsType> = (props) => {
    return (
        <div className={`${style.users} ${commonStyles.whiteBlock}`}>

            <div>
                {props.users.map(u => <User key={u.id}
                                            user={u}
                                            follow={props.follow}
                                            unfollow={props.unfollow}
                                            followingInProgress={props.followingInProgress}/>
                )}
            </div>

            <Pagination totalItemsCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPageNumber={props.currentPageNumber}
                        onPageChange={props.onPageChange}/>
        </div>
    )
}

export default Users