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
        <div className="flex flex-col justify-center border-2 p-5 rounded-2xl shadow-2xl">
            <div className="text-lg">
                {
                    chat.map((m, i) => (
                        <p key={i}><span className="text-[#0442ED] font-medium">{m.name}</span>: {m.msg}</p>
                    ))
                }
            </div>
            <form onSubmit={handleSubmitMsg} className="flex justify-center items-center w-full p-5">
                <input
                    type="text"
                    placeholder="Enter Message..."
                    className="border-black border-2 border-r-0 rounded-l-xl p-2 pl-3 w-10/12"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button
                    className="border-black w-2/12 border-2 rounded-r-xl p-2 bg-[#0442ED] text-white hover:bg-black font-semibold"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat