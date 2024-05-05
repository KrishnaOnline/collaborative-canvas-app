import { useEffect, useState } from "react"

const Chat = ({socket}) => {
    const [chat, setChat] = useState([])
    const [msg, setMsg] = useState("")

    useEffect(() => {
        socket.on("msgResponse", (data) => {
            setChat(prevChat => [...prevChat, data])
        })
    }, [])

    const handleSubmitMsg = (e) => {
        e.preventDefault()
        if(msg.trim()!=="") {
            setChat(prevChat => [...prevChat, {msg, name: "You"}])
            socket.emit("message", {msg})
            setMsg("")
        }
    }

    return (
        <div>
            <div>
                {
                    chat.map((m, i) => (
                        <p key={i}>{m.name}: {m.msg}</p>
                    ))
                }
            </div>
            <form onSubmit={handleSubmitMsg} className="border p-5">
                <input
                    type="text"
                    placeholder="Enter Message..."
                    className=""
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat