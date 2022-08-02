import React from "react";
import style from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode = () => { // создаем метод с помощью синтаксиса стрелочной функции, чтобы не потерять контекст
        this.setState({ // встроенный метод, перезаписывает свойства в локальном state // асинхронен
            editMode: true
            })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
            })
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input value={this.props.status} onBlur={this.deactivateEditMode} autoFocus={true}/>
                    : <div className={style.status} onClick={this.activateEditMode}>{this.props.status}</div>
                }
            </div>
        )
    }
}

export default ProfileStatus;