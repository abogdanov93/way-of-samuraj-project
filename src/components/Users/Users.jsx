import React from "react";
import style from "./Users.module.css";
import user from "../../images/user.jpeg"

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div className={style.users}>
                <div className={style.pageNumbers}>
                    {pages
                        .map(p => {
                            return <div className={props.currentPage === p && style.selectedPage} onClick={(e) => props.onPageChange(p)}>{p}</div>
                        })
                    }
                </div>

                {props.users.map(u =>
                    <div key={u.id}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : user}/>
                        </div>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </div>
                )}

            </div>
        );
}

export default Users;