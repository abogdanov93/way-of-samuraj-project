import React, {FC, useState} from "react";
import style from "./Pagination.module.css";

type propsType = {
    totalItemsCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    currentPageNumber: number
    portionSize?: number
}

const Pagination: FC<propsType> = ({totalItemsCount, pageSize, onPageChange, currentPageNumber, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPotionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={style.pageNumbers}>
        {portionNumber > 1 &&
        <div>
            <div onClick={() => {setPotionNumber(portionNumber = 1)}}>The first</div>
            <div onClick={() => {setPotionNumber(portionNumber - 1)}}>Previous</div>
        </div>
        }

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <div className={currentPageNumber === p && style.selectedPage}
                            onClick={(e) => onPageChange(p)}>{p}</div>
            })
        }

        {portionCount > portionNumber &&
        <div>
            <div onClick={() => {setPotionNumber(portionNumber + 1)}}>Next</div>
            <div onClick={() => {setPotionNumber(portionNumber = portionCount)}}>The last</div>
        </div>}
    </div>
}

export default Pagination;