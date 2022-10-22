// import React, {FC} from "react"
// import style from "./Message.module.css"
//
// type propsType = {
//     message: string
// }
//
// const Message: FC<propsType> = ({message}) => {
//     return <div className={style.message}>{message}</div>
// }
//
// export default Message
//

import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import React, {createElement, FC, ReactNode, useState} from 'react';

type propsType = {
    message: ReactNode
}

const Message: FC<propsType> = ({message}) => {
    console.log(message)

    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [action, setAction] = useState<string | null>(null)

    const like = () => {
        setLikes(1)
        setDislikes(0)
        setAction('liked')
    }

    const dislike = () => {
        setLikes(0)
        setDislikes(1)
        setAction('disliked')
    }

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ]

    return (
        <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={<p>{message}</p>}
            datetime={
                <Tooltip title="2016-11-22 11:22:33">
                    <span>8 hours ago</span>
                </Tooltip>
            }
        />
    )
}

export default Message