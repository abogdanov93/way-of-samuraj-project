import React, {useEffect, useState} from "react";
import style from "./ProfileStatus.module.css";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false); // создаем локальный стейт, который изначально равен false
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status); // когда пользователь выйдет из режима редактирования, отправить put запрос
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {editMode
                ? <input value={status}
                         onChange={onStatusChange}
                         onBlur={deactivateEditMode}
                         autoFocus={true}
                />
                : <div className={style.status} onClick={activateEditMode}>
                    {props.status || "Write something..."}
                </div>
            }
        </div>
    )
}

export default ProfileStatus;