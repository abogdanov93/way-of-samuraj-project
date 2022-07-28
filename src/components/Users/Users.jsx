import React from "react";
import style from "./Users.module.css";
import user from "../../images/user.jpeg"
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.users}>
            {props.users.map(u =>
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
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.setFollowingInProgress(true, u.id);
                                    props.unfollowUser(u.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.unfollow(u.id);
                                    }
                                    props.setFollowingInProgress(false, u.id);
                                })
                            }}>Unfollow</button>
                            : <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.setFollowingInProgress(true, u.id);
                                    props.followUser(u.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.follow(u.id);
                                    }
                                    props.setFollowingInProgress(false, u.id);
                                })
                            }}>Follow</button>
                        }
                    </div>
                </div>
            )}

            <div className={style.pageNumbers}>
                {pages
                    .map(p => {
                        return <div className={props.currentPage === p && style.selectedPage}
                                    onClick={(e) => props.onPageChange(p)}>{p}</div>
                    })
                }
            </div>
        </div>
    );
}

export default Users;