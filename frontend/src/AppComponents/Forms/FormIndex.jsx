import CreateRoomForm from "./CreateRoomForm"
import JoinRoomForm from "./JoinRoomForm"
// import {useForm} from "react-hook-form"

const Forms = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-around">
            <CreateRoomForm/>
            <JoinRoomForm/>
        </div>
    )
}

export default Forms