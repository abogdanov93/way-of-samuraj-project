import React from "react";
import style from "./Users.module.css";
import user from "../../images/user.jpeg"
import {NavLink} from "react-router-dom";
import axios from "axios";

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
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY":"d822d21c-724f-4d0e-af57-432203ec8beb"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0){
                                            props.unfollow(u.id);
                                        }
                                    });
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY":"d822d21c-724f-4d0e-af57-432203ec8beb"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0){
                                            props.follow(u.id);
                                        }
                                    });
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