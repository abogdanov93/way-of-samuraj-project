import React from "react";
import style from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => { // создаем метод с помощью синтаксиса стрелочной функции, чтобы не потерять контекст
        this.setState({ // встроенный метод, перезаписывает свойства в локальном state // асинхронен
            editMode: true
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status); // когда пользователь выйдет из режима редактирования, отправить put запрос
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
            console.log("update");
        }
    }

    render() {
        console.log("render");
        return (
            <div>
                {this.state.editMode
                    ? <input
                        value={this.state.status}
                        onChange={this.onStatusChange}
                        onBlur={this.deactivateEditMode}
                        autoFocus={true}/>
                    : <div className={style.status} onClick={this.activateEditMode}>
                        {this.props.status || "Write something..."}
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;