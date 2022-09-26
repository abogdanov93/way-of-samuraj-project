export type chatMessageAPIType = {
    message: string
    photo: string
    userId?: number
    userName: string
}
type eventType = "messagesReceived" | "statusChanged"
export type statusType = "pending" | "ready" | "error"
type messagesReceivedSubscriberType = (messages: chatMessageAPIType[]) => void
type statusChangedSubscriberType = (status: statusType) => void

const subscribers = {
    "messagesReceived": [] as messagesReceivedSubscriberType[],
    "statusChanged": [] as statusChangedSubscriberType[]
}

let ws: WebSocket | null = null

const notifySubscribersAboutStatus = (status: statusType) => {
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
    subscribe(eventName: eventType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: eventType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {
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