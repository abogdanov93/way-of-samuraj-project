import React, {FC} from "react"
import style from "./MyInput.module.css"

type ownPropsType = {
    placeholder: string
    type?: string
    name?: string
    errors?: any
    register?: any
    validationSchema?: any
    required?: boolean
}

export const MyInput: FC<ownPropsType> = ({name, register, errors, required, type, validationSchema}) => {
    return <>
        <input
            className={style.myInput}
            id={name}
            name={name}
            type={type}
            {...register(name, validationSchema)}
        />

        {errors.name && <div className={style.errorWarning}>{errors?.name?.message}</div>}

    </>
}