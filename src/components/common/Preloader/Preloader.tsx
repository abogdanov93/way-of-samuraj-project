import React, {FC} from "react"
import style from "./Preloader.module.css"
import preloader from "../../../uploads/images/yellowPreloader.svg"

type propsType = {
    style?: any
}

let Preloader: FC<propsType> = (props) => {
    return <div className={style.preloader}>
        <div style={props.style}>
            <img src={preloader}/>
        </div>
    </div>
}

export default Preloader