export type chatMessageType = {
    message: string
    photo: string
    userId?: number
    userName: string
}
type subscriberType = (messages: chatMessageType[]) => void

let subscribers = [] as subscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach( s => s(newMessages)) // не поняла синтаксис
}

const createChannel = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}

export const chatAPI = {
    start() {
      createChannel()
    },
    // subscribe - подписаться на новые сообщения // добавить подписчика в массив подписчиков
    // callback - функция, которая принимает массив новых сообщений, не возвращает ничего // почему это подписчик?
    subscribe(callback: subscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: subscriberType) {
        subscribers = subscribers.filter( s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    }
}