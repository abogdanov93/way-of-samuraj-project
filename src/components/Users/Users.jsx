import React from "react";
import style from "./Users.module.css";
import axios from "axios";
import user from "../../images/user.jpeg"

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                debugger
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div className={style.users}>
                <div className={style.pageNumbers}>
                    {pages
                        .map(p => {
                            return <div className={this.props.currentPage === p && style.selectedPage}>{p}</div>
                        })
                    }
                </div>

                {this.props.users.map(u =>
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
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default Users;