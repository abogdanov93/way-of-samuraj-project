import React, {FC} from "react"
import style from "./Preloader.module.css"
import preloader from "../../../images/yellowPreloader.svg"


let Preloader: FC = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader