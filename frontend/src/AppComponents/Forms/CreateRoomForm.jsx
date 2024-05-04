import { useState } from "react"

const CreateRoomForm = ({generateID, socket, setUser}) => {
    const [roomID, setRoomID] = useState(generateID())
    const [name, setName] = useState("")

    const handleCreateRoom = (e) => {
        e.preventDefault()
        const roomData = {
            name,
            roomID,
            userID: generateID(),
            host: true,
            presenter: true,
        }
        setUser(roomData)
        socket.emit("userJoined", roomData)
        // console.log(roomData)
    }

    return (
        <div className="border p-5">
            <h1 className="mb-5 text-2xl font-bold">Create Room</h1>
            <form>
                <div>
                    <input 
                        type="text" 
                        className=""
                        placeholder="Enter your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        disabled 
                        type="text"
                        value={roomID}
                        placeholder="Generate Room Code"
                    />
                    <button 
                        type="button"
                        onClick={() => setRoomID(generateID())}
                    >Generate</button>
                    {/* <button type="button">Copy</button> */}
                </div>
                <div>
                    <button type="submit" onClick={handleCreateRoom}>
                        Generate Room
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateRoomForm