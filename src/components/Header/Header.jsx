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
               <input className={style.input} type="text" required placeholder="What are you looking for?" />
           </div>
       </header>
    );
}

export default Header;