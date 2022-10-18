import React, {ReactNode} from "react"
import style from "./MyBytton.module.css"

type propsType = {
    children: ReactNode
    type?: any
    disabled?: boolean
}

export const MyButton = ({children, ...props}: propsType) => {
    return <button className={style.myButton} {...props}>{children}</button>
}
