import React from "react";
import style from "./Header.module.css"

const Header = () => {
    return (
       <header className={style.header}>
           <div className={style.logo}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/FortniteLogo.svg"/>
           </div>
           <div className={style.searcher}>
               <input type="text" required placeholder="Search" />
               <button type="submit">Go!</button>
           </div>
       </header>
    );
}

export default Header;