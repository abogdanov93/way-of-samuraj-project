import React, {useEffect, useState} from "react";
import style from "./ProfileStatus.module.css";

const ProfileStatusWithHook = (props) => {

    const [edithMode, setEdithMode] = useState(false); // создаем локальный стейт, который изначально равен false
    const [status, setStatus] = useState(props.status);
    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEdithMode(true);
    }
    const deactivateEdithMode = () => {
        setEdithMode(false);
        props.updateStatus(status); // когда пользователь выйдет из режима редактирования, отправить put запрос
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {edithMode
                ? <input value={status}
                         onChange={onStatusChange}
                         onBlur={deactivateEdithMode}
                         autoFocus={true}
                />
                : <div className={style.status} onClick={activateEditMode}>
                    {props.status || "Write something..."}
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHook;