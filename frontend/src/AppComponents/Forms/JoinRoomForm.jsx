import { useState } from "react"
import { useNavigate } from "react-router-dom"

const JoinRoomForm = ({generateID, socket, setUser}) => {
    const [roomID, setRoomID] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleJoinRoom = (e) => {
        e.preventDefault()
        const roomData = {
            name,
            roomID,
            userID: generateID(),
            host: false,
            presenter: false,
        }
        setUser(roomData)
        navigate(`/${roomID}`)
        socket.emit("userJoined", roomData)
    }

    return (
        <div className="border rounded-3xl shadow-2xl p-5 w-[500px] flex flex-col items-center h-[350px]">
            <h1 className="mb-4 mt-3 text-4xl pl-4 text-[#0442ED] font-bold">Join Room</h1>
            <form className="p-5 flex flex-col text-xl gap-5 w-5/6">
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your Name" 
                        className="border-black border-2 rounded-xl p-2 pl-3 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Room Code"
                        className="border-black border-2 rounded-xl p-2 pl-3 w-full"
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="w-full border-black border-2 p-2 rounded-2xl bg-[#0442ED] text-white hover:bg-black font-semibold"
                        type="submit"
                        onClick={handleJoinRoom}
                    >Join Room</button>
                </div>
            </form>
        </div>
    )
}

export default JoinRoomForm