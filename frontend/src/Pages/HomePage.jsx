import Forms from "@/AppComponents/Forms/FormIndex"

const HomePage = ({generateID, socket, setUser}) => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Forms generateID={generateID} socket={socket} setUser={setUser}/>
        </div>
    )
}

export default HomePage