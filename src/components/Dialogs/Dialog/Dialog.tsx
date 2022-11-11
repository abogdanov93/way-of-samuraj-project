import React, {FC} from "react"
import style from "./Dialog.module.css"
import {NavLink} from "react-router-dom"

type propsType = {
    id: number
    name: string
    lastMessage: string
}

const Dialog: FC<propsType> = ({id, name, lastMessage}) => {
    return (
        <div className={style.dialog}>
            <NavLink to={"/dialogs/" + id}
                     className={navData => navData.isActive ? style.activeLink : style.link}>
                {name}
            </NavLink>
            <p>{lastMessage}</p>
        </div>
    )
}

export default Dialog