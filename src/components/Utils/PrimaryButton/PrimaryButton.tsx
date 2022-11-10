import React, {FC, ReactNode} from "react"
import style from "./PrimaryBytton.module.css"

type propsType = {
    children: ReactNode
    type?: any
    disabled?: boolean
    onClick?: any
}

export const PrimaryButton: FC<propsType> = ({children, ...props}) => {
    return <button className={style.myButton} {...props}>{children}</button>
}
