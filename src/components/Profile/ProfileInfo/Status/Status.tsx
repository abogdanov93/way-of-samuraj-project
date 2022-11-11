import React, {FC} from 'react'
import style from "../Status/Status.module.css"
import ProfileStatus from "../../ProfileStatus/ProfileStatus"
import {updateStatusThunk} from "../../../../redux/actions/profileActions"
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux"

type PropsType = {
    className: any
}

export const Status: FC<PropsType> = () => {

    const {status} = useAppSelector(state => state.profilePage)
    const dispatch = useAppDispatch()
    const updateStatus = (status: string) => dispatch(updateStatusThunk(status))

    return  <div className={style.status}>
        <ProfileStatus
            status={status}
            updateStatus={updateStatus}/>
    </div>
}