export type ChatMessageAPIType = {
    message: string
    photo: string
    userId?: number
    userName: string
}
type EventType = "messagesReceived" | "statusChanged"
export type StatusType = "pending" | "ready" | "error"
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

const subscribers = {
    "messagesReceived": [] as MessagesReceivedSubscriberType[],
    "statusChanged": [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["statusChanged"].forEach(s => s(status))
}

const closeHandler = () => {
    notifySubscribersAboutStatus("pending")
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messagesReceived"].forEach(s => s(newMessages))
}

export const openHandler = () => {
    notifySubscribersAboutStatus("ready")
}

const errorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.log("REFRESH PAGE")
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
}

const createChannel = () => {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus("pending")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    // subscribe - подписаться на новые сообщения // добавить подписчика в массив подписчиков
    // callback - функция, которая принимает массив новых сообщений, не возвращает ничего // почему это подписчик?
    subscribe(eventName: EventType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stop() {
        subscribers["messagesReceived"] = []
        subscribers["statusChanged"] = []
        cleanUp()
        ws?.close()
    }
}