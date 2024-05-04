import CreateRoomForm from "./CreateRoomForm"
import JoinRoomForm from "./JoinRoomForm"
// import {useForm} from "react-hook-form"

const Forms = ({generateID, socket, setUser}) => {
    return (
        <div className="flex flex-wrap gap-5 justify-around">
            <CreateRoomForm generateID={generateID} socket={socket} setUser={setUser}/>
            <JoinRoomForm/>
        </div>
    )
}

export default Forms