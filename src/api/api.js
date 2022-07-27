import axios from "axios";

export const getUsers = (currentPageNumber, pageSize) => {
    return (
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPageNumber}&count=${pageSize}`, {
            withCredentials: true
        })
    )
        .then(response => response.data) // цепочка промисов, цепочка then // return response --> return data
}