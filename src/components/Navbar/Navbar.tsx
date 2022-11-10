import React, {FC} from "react"
import style from "./Navbar.module.css"
import {NavLink} from "react-router-dom"
import {pages} from "../pagesConfig";

const Navbar: FC = () => {
    return (
        <nav className={style.navbar}>
                {pages.map((page, index) => {
                        return (
                            <div key={`nav_${index}`}>
                                <NavLink to={page.path}
                                         className={navData => navData.isActive ? style.activeLink : style.link}>
                                    {page.title}
                                </NavLink>
                            </div>
                        )
                })}
        </nav>
    )
}

export default Navbar