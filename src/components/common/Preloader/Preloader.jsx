import React from "react";
import style from "./Preloader.module.css";
import preloader from "../../../images/preloader.svg";

let Preloader = (props) => {
    return (
        <div className={style.preloader}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader;