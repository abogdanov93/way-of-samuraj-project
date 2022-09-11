import React, {FC} from "react"
import style from "./Dialog.module.css"
import {NavLink} from "react-router-dom"

type propsType = {
    id: number
    name: string
}

const Dialog: FC<propsType> = ({id, name}) => {
    return (
        <div className={style.dialog}>
            <NavLink to={"/dialogs/" + id} className={navData => navData.isActive ? style.activeLink : style.link}>
                {name}
            </NavLink>
        </div>
    )
}

export default Dialog