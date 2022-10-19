import React, {FC} from "react"
import style from "./FriendsBlock.module.css"
import commonStyles from "./../../App.module.css"

const FriendsBlock: FC = () => {
//todo: запросить юзеров с фильтром друзья
    // const dispatch = useDispatch()
    // const friends = dispatch(requestUsers(null, null, true) as unknown as AnyAction)

    return <div className={`${style.friends} ${commonStyles.whiteBlock}`}>
        <h3 className={style.title}>Friends</h3>
        <div className={style.friend}>

        </div>
    </div>
}

export default FriendsBlock