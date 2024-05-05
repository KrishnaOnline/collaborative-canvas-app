import { useState } from "react"
import {useNavigate} from "react-router-dom"

const CreateRoomForm = ({generateID, socket, setUser}) => {
    const [roomID, setRoomID] = useState(generateID())
    const [name, setName] = useState("")
    const navigate = useNavigate()

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
        navigate(`/${roomID}`)
        socket.emit("userJoined", roomData)
        // console.log(roomData)
    }

    return (
        <div className="border rounded-3xl shadow-2xl p-5 w-[500px] flex flex-col items-center h-[350px]">
            <h1 className="mb-4 mt-3 text-4xl pl-4 text-[#0442ED] font-bold">Create Room</h1>
            <form className="p-5 flex flex-col text-xl gap-5 w-5/6">
                <div>
                    <input 
                        type="text" 
                        className="border-black border-2 rounded-xl p-2 pl-3 w-full"
                        placeholder="Enter your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="w-full flex gap-0">
                    <input 
                        disabled 
                        type="text"
                        className="border-black border-2 border-r-0 rounded-l-xl p-2 pl-3 w-4/5"
                        value={roomID}
                        placeholder="Generate Room Code"
                    />
                    <button 
                        className="border-black border-2 rounded-r-xl px-3 bg-[#0442ED] text-white hover:bg-black font-semibold"
                        type="button"
                        onClick={() => setRoomID(generateID())}
                    >Generate</button>
                    {/* <button type="button">Copy</button> */}
                </div>
                <div>
                    <button 
                        className="w-full border-black border-2 p-2 rounded-2xl bg-[#0442ED] text-white hover:bg-black font-semibold"
                        type="submit" onClick={handleCreateRoom}
                    >
                        Generate Room
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateRoomForm