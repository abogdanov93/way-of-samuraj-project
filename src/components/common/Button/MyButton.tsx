import React, {ReactNode} from "react"
import style from "./MyBytton.module.css"

type propsType = ReactNode

export const MyButton = ({...children}) => {
    return <button className={style.myButton}>
        {/*{children}*/}
        </button>
}
