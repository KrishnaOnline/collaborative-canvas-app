const CreateRoomForm = () => {
    return (
        <div className="border p-5">
            <h1 className="mb-5 text-2xl font-bold">Create Room</h1>
            <form>
                <div>
                    <input type="text" placeholder="Enter your Name" />
                </div>
                <div>
                    <input disabled type="text" placeholder="Generate Room Code"/>
                    <button type="button">Generate</button>
                    {/* <button type="button">Copy</button> */}
                </div>
                <div>
                    <button>Generate Room</button>
                </div>
            </form>
        </div>
    )
}

export default CreateRoomForm