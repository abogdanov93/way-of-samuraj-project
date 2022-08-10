import React from "react";
import style from "./FormControl.module.css";

export const Element = ({meta, input, ...props}) => {
    const showError = meta.touched && meta.error;
    return <div>
        {showError && <div className={style.errorWarning}>{meta.error}</div>}
        <props.fieldType className={showError && style.errorFrame} {...input} {...props}/>
    </div>
}
