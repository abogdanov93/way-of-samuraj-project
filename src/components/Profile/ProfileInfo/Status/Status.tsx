import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import style from "../Status/Status.module.css"
import {updateStatusThunk} from "../../../../redux/actions/profileActions"
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux"

type PropsType = {
    isOwner: boolean
    className: any
}

export const Status: FC<PropsType> = ({isOwner}) => {

    const {status} = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()
    const updateStatus = (status: string) => dispatch(updateStatusThunk(status))

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const activateEditMode = () => {
        isOwner && setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(localStatus) // когда пользователь выйдет из режима редактирования, отправить put запрос
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return  <div className={style.status}>
        {editMode
            ? <input value={localStatus}
                     onChange={onStatusChange}
                     onBlur={deactivateEditMode}
                     autoFocus={true}
            />
            : <div  onClick={activateEditMode}>
                {status || "Write something..."}
            </div>
        }
    </div>
}