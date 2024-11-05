import { useState, useEffect } from 'react'


const WS_URL = 'ws://localhost:8000/'

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            console.log('Connected to the server')
            setSocket(ws)
        }
        ws.onclose = () => {
            console.log('Disconnected from the server')
            setSocket(null)
        }
        return () => {
            ws.close()
        }
    }, [])

    return socket
}