import React, {FC, ReactNode} from "react"
import style from "./MySecondaryButton.module.css"

type propsType = {
    children: ReactNode
    type?: any
    disabled?: boolean
    onClick?: any
}

export const MySecondaryButton: FC<propsType> = ({children, ...props}) => {
    return <button className={style.myButton} {...props}>{children}</button>
}
