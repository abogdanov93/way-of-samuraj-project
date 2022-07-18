import React from "react";
import style from "./FriendsBlock.module.css";
import Friends from "./Friends/Friends";

const FriendsBlock = (props) => {
    let friendElement = props.store.getState().profile.friends
        .map(f => <Friends id={f.id} name={f.name} avatar={f.avatar} />);

    return (
            <div className={style.friendsBlock}>
                <h4 className={style.friends}>Friends:</h4>
                <div className={style.friendsItem}>{friendElement}</div>
            </div>
    );
}

export default FriendsBlock;