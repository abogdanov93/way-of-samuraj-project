import React, {createRef} from "react";
import style from "./NewPost.module.css";

const NewPost = (props) => {
    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
        // props.updatePostText("");
    }

    let updatePostText = () => {
        let newText = newPostElement.current.value; // берет value из textarea
        props.updatePostText(newText); // вызывает callback функцию из стейта, которая пушит newText в state
    }

    return (     // при изменениях в textarea вызыввется функция updatePostText
        <div className={style.newPost}>
            <textarea ref={newPostElement}
                      value={props.newPostText}
                      onChange={updatePostText}/>
            <button onClick={addPost}>Post</button>
        </div>
    );
}

export default NewPost;