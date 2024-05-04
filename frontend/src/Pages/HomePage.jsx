import Forms from "@/AppComponents/Forms/FormIndex"

const HomePage = ({generateID, socket, setUser}) => {
    return (
        <div className="">
            <Forms generateID={generateID} socket={socket} setUser={setUser}/>
        </div>
    )
}

export default HomePage