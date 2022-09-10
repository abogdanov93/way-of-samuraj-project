import React, {ChangeEvent, FC, useEffect, useState} from "react"
import style from "./ProfileStatus.module.css"

type propsType = {
    status: string
    updateStatus: (localStatus: string) => void
}

const ProfileStatus: FC<propsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)
    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(localStatus) // когда пользователь выйдет из режима редактирования, отправить put запрос
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <input value={localStatus}
                         onChange={onStatusChange}
                         onBlur={deactivateEditMode}
                         autoFocus={true}
                />
                : <div className={style.status} onClick={activateEditMode}>
                    {status || "Write something..."}
                </div>
            }
        </div>
    )
}

export default ProfileStatus