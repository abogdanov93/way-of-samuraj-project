import React, {FC} from "react"
import style from "./MyPreloader.module.css"
import preloader from "../../../uploads/images/yellowPreloader.svg"

type PropsType = {
    style?: any
}

const MyPreloader: FC<PropsType> = (props) => {
    return <div className={style.preloader}>
        <div style={props.style}>
            <img src={preloader}/>
        </div>
    </div>
}

export default MyPreloader