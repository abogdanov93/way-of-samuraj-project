import React, {FC} from 'react'
import style from "./MyTextarea.module.css"

type propsType = {
    placeholder: string
    value: string
    onChange: (e:  React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const MyTextarea: FC<propsType> = ({...props}) => {

    return <textarea className={style.myTextarea} {...props} />
}