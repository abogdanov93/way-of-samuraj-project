import React from "react";
import style from "./FriendsBlock.module.css";
import commonStyles from "./../../App.module.css";

const FriendsBlock = () => {
    return (
        <div className={`${style.friends} ${commonStyles.whiteBlock}`}>
            <h4 className={style.title}>Friends:</h4>
            <div className={style.friend}>
                <div>
                    <img
                        className={style.avatar}
                        src="https://i.pinimg.com/474x/83/73/c9/8373c9bbddf97a72c445eab91f3d6fbc.jpg"/>
                </div>
                <div className={style.name}>marusik_super</div>
            </div>
            <div className={style.friend}>
                <div>
                    <img
                        className={style.avatar}
                        src="https://media.fortniteapi.io/images/cosmetics/e9d61c4a4aae593fbac8d72182da83f2/v2/background.png"/>
                </div>
                <div className={style.name}>notfat100kg</div>
            </div>
        </div>
    );
}

export default FriendsBlock;