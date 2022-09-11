import React, {FC} from "react"
import style from "./Message.module.css"

type propsType = {
    message: string
}

const Message: FC<propsType> = ({message}) => {
    return <div className={style.message}>{message}</div>
}

export default Message