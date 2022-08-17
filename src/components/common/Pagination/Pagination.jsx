import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({totalUsersCount, pageSize, onPageChange, currentPageNumber}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div className={style.pageNumbers}>
        {pages.map(p => {
                return <div className={currentPageNumber === p && style.selectedPage}
                            onClick={(e) => onPageChange(p)}>{p}</div>
            })
        }
    </div>
}

export default Pagination;