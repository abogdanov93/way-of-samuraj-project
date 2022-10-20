import React, {FC, ReactElement} from 'react'
import style from "./Contact.module.css"
import {Link} from "react-router-dom"
import {Tag} from "antd"
import {
    FacebookOutlined,
    GithubOutlined,
    InstagramOutlined, MailOutlined,
    SmileOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons"
import vk from "../../../../images/vk-icon.svg"

type propsType = {
    name: string
    link: string
}

export const Contact = ({name, link}: propsType) => {

    // let data = {
    //     icon: null as any,
    //     color: null as any,
    //     text: null as null | string
    // }


    switch (name) {
        case "facebook":
            return <a href={link}><Tag icon={<FacebookOutlined/>} color="#3b5999">Facebook</Tag></a>
        case "github":
            return <a href={link}><Tag icon={<GithubOutlined/>} color="#471F49">GitHub</Tag></a>
        case "vk":
            return <a href={link}><Tag icon={<img className={style.icon} src={vk}/>} color="#0077FF">VK</Tag></a>
        case "twitter":
            return <a href={link}><Tag icon={<TwitterOutlined/>} color="#55acee">Twitter</Tag></a>
        case "instagram":
            return <a href={link}><Tag icon={<InstagramOutlined/>} color="#CF2E71">Instagram</Tag></a>
        case "youtube":
            return <a href={link}><Tag icon={<YoutubeOutlined/>} color="#cd201f">Youtube</Tag></a>
        case "mainLink":
            return <a href={link}><Tag icon={<MailOutlined/>} color="#F8CD59">MainLink</Tag></a>
        default:
            return <a href={link}><Tag icon={<SmileOutlined/>} color="#FFB300">Website</Tag></a>
    }

    // if (link) {
    //     return <div>
    //         <Link to={link}>
    //             <Tag color={data.color}>{data.text}</Tag>
    //         </Link>
    //     </div>
    // }

}