import React, {FC} from "react"
import style from "./MyInput.module.css"
import {Control, FieldName, FieldValues, RegisterOptions} from "react-hook-form"

type ownPropsType = {
    placeholder: string
}

type UseControllerProps<TFieldValues extends FieldValues = FieldValues> = {
    name: FieldName<TFieldValues>
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' >
    onFocus?: () => void
    defaultValue?: unknown
    control?: Control<TFieldValues>
}

export const MyInput:FC<ownPropsType > = ({...props}) => {
    return <input className={style.myInput} {...props}/>
}