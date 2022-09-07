import React from "react";
import style from "./FormControl.module.css";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type elementPropsType = {
    meta: WrappedFieldMetaProps
    fieldType: string
    props: any // нужны ли пропсы тут?
}

export const Element: React.FC<elementPropsType> = ({meta, fieldType, ...props}) => {
    const showError = meta.touched && meta.error;
    return <div>
        {showError && <div className={style.errorWarning}>{meta.error}</div>}
        {fieldType === "input" && <input className={showError && style.errorFrame} {...props}/>}
        {fieldType === "textarea" && <textarea className={showError && style.errorFrame} {...props}/>}
    </div>
}

