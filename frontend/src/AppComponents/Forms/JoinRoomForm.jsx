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
        <div className="border p-5">
            <h1 className="mb-5 text-2xl font-bold">Join Room</h1>
            <form>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Generate Room Code"
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handleJoinRoom}
                    >Join Room</button>
                </div>
            </form>
        </div>
    )
}

export default JoinRoomForm