import React, {FC} from 'react'
import {FrownOutlined} from "@ant-design/icons"
import style from "./Error.module.css"

type PropsType = {
    error: string
}

export const Error: FC<PropsType> = ({error}) => {
    return <div className={style.error}>
        <FrownOutlined />
        <label>{error}</label>
        </div>
}
