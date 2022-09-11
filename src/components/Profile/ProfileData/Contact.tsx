import React, {FC} from "react"

type propsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<propsType> = ({contactTitle, contactValue}) => {
    return <div>
        {contactTitle}: {contactValue}
    </div>
}

export default Contact