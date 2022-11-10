import React from "react"
import style from "./NavMenu.module.css"
import {pages} from "../pagesConfig"
import {NavLink} from "react-router-dom"

export const NavMenu = () => {
    return <div className={style.navMenu}>
        {pages.map((page, index) => {
            return (
                    <NavLink to={page.path}
                             key={`navMenu_${index}`}
                             className={navData => navData.isActive ? style.activeLink : style.link}
                    >
                        {page.icon}
                        {page.title}
                    </NavLink>
            )
        })}
        </div>
}