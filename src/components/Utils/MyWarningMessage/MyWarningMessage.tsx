import React, {FC} from "react"
import style from "./MyWarningMessage.module.css"

type PropsType = {
    message: string
}

export const MyWarningMessage: FC<PropsType> = ({message}) => {
    return <div className={style.warning}>{message}</div>
}