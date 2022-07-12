import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const Dialogs = () => {
    let dialogs = [
        {id: 1, name: "marusik_super"},
        {id: 2, name: "notfat100kg"}
    ]

    let messages = [
        {id: 1, message: "Привет, мы с Натуликом в лобби."},
        {id: 2, message: "Почему все так лагает?!"},
        {id: 3, message: "Марусик, поправь наушники!"}
    ]

    let dialogElement = dialogs
        .map(d => <Dialog id={d.id} name={d.name}/>);

    let messageElement = messages
        .map(m => <Message id={m.id} message={m.message}/>)


    return (
        <div className={style.dialogs}>
            <div>
                {dialogElement}
            </div>
            <div>
                {messageElement}
            </div>

        </div>
    );
}

export default Dialogs;