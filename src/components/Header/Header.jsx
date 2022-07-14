import React from "react";
import style from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = () => {
    return (
       <header className={style.header}>
           <div className={style.logo}>
               <img src={logo}/>
           </div>
           <div className={style.searcher}>
               <input type="text" required placeholder="Search" />
               <button type="submit">Go!</button>
           </div>
       </header>
    );
}

export default Header;