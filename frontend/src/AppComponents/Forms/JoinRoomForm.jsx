const JoinRoomForm = () => {
    return (
        <div className="border p-5">
            <h1 className="mb-5 text-2xl font-bold">Join Room</h1>
            <form>
                <div>
                    <input type="text" placeholder="Enter your Name" />
                </div>
                <div>
                    <input type="text" placeholder="Generate Room Code"/>
                </div>
                <div>
                    <button>Join Room</button>
                </div>
            </form>
        </div>
    )
}

export default JoinRoomForm