import React, {FC} from 'react'
import {FrownOutlined} from "@ant-design/icons"
import style from "./MyErrorMessage.module.css"

type PropsType = {
    error: string
}

export const MyErrorMessage: FC<PropsType> = ({error}) => {
    return <div className={style.error}>

        <FrownOutlined className={style.smile}/>
        <h4>{error}</h4>

    </div>
}
