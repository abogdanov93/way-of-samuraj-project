import React from "react";
import style from "./Users.module.css";
import commonStyles from "./../../App.module.css";
import user from "../../images/user.jpeg"
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination/Pagination";

const Users = ({
                   totalUsersCount,
                   pageSize,
                   currentPageNumber,
                   onPageChange,
                   users,
                   followingInProgress,
                   follow,
                   unfollow
               }) => {
    return (
        <div className={`${style.users} ${commonStyles.whiteBlock}`}>
            {users.map(u =>
                <div key={u.id}>

                    <NavLink to={"/profile/" + u.id}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : user}/>
                        </div>
                        <div>
                            {u.name}
                        </div>
                    </NavLink>

                    <div>
                        {u.followed
                            ? <button
                                disabled={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    unfollow(u.id)
                                }}>Unfollow</button>
                            : <button
                                disabled={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    follow(u.id)
                                }}>Follow</button>
                        }
                    </div>
                </div>
            )}
            <Pagination totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        currentPageNumber={currentPageNumber}/>
        </div>
    );
}

export default Users;