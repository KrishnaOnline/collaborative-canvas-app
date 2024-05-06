import Canvas from "@/AppComponents/Canvas"
import Chat from "@/AppComponents/Chat"
import { useEffect, useRef, useState } from "react"
import { FaPencilAlt } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const RoomPage = ({user, socket, users}) => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState("black")
    const [elements, setElements] = useState([])
    const [history, setHistory] = useState([])

    // useEffect(() => {
    //     return () => {
    //         socket.emit("userLeft", user)
    //     }
    // }, [])

    const handleClearCanvas = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.fillRect = "white"
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        setElements([])
    }

    const undoHandler = () => {
        setHistory(prevHist => [
            ...prevHist,
            elements[elements.length-1]
        ])
        setElements(prevElems => 
            prevElems.slice(0, prevElems.length-1)
        )
    }
    const redoHandler = () => {
        setElements(prevElems => [
            ...prevElems,
            history[history.length-1]
        ])
        setHistory(prevHist => 
            prevHist.slice(0, prevHist.length-1)
        )
    }

    return (
        <div className="flex flex-wrap w-full justify-center items-center flex-col mx-auto">
            <h1 className="mb-9 mt-3 text-4xl pl-4 text-[#0442ED] font-bold">Canvas <span className="font-normal text-green-500">[Users Joined: <span className="font-medium">{users.length}</span>]</span></h1>
            {
                user && user.presenter && (
                    <div className="flex flex-wrap justify-center items-center gap-10 mx-auto">
                        <div className="flex items-center justify-center">
                            <div className="flex gap-1 border-black rounded-l-lg border-2 border-r-0 p-2 items-center">
                                <input
                                    type="radio"
                                    name="tool"
                                    id="pencil"
                                    className="font-medium"
                                    checked={tool==="pencil"}
                                    value="pencil"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                                <label className="font-medium flex items-center gap-2 text-lg" htmlFor="pencil">Pencil <FaPencilAlt /></label>
                            </div>
                            <div className="flex gap-1 border-black border-2 border-r-0 p-2 items-center">
                                <input
                                    type="radio"
                                    name="tool"
                                    id="line"
                                    checked={tool==="line"}
                                    value="line"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                                <label className="font-medium flex items-center gap-2 text-lg" htmlFor="line">Line |</label>
                            </div>
                            <div className="flex gap-1 border-black border-2 rounded-r-lg p-2 items-center">
                                <input
                                    type="radio"
                                    name="tool"
                                    id="rect"
                                    checked={tool==="rect"}
                                    value="rect"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                                <label className="font-medium flex items-center gap-2 text-lg" htmlFor="rect">Rectangle <RiRectangleLine /></label>
                            </div>
                        </div>
                        <div className="border-black rounded-lg border-2 p-2">
                            <label className="font-medium flex items-center gap-2 text-lg">
                                <p>Select Color: </p>
                                <input
                                    type="color"
                                    id="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="text-2xl border-black border-2 rounded-full p-1 hover:bg-black hover:text-white cursor-pointer"
                                disabled={elements.length===0}
                                onClick={undoHandler}
                            ><LuUndo2 /></button>
                            <button
                                className="text-2xl border-black border-2 rounded-full p-1 hover:bg-black hover:text-white cursor-pointer"
                                disabled={history.length<1}
                                onClick={redoHandler}
                            ><LuRedo2 /></button>
                        </div>
                        <div>
                            <button className="border-black border-2 p-2 rounded-lg bg-red-700 text-white px-3 hover:bg-red-500 flex items-center font-medium text-xl" onClick={handleClearCanvas}>Clear Canvas</button>
                        </div>
                    </div>
                )
            }
            <div className="mx-auto mt-5 w-4/5">
                <Canvas 
                    canvasRef={canvasRef} 
                    contextRef={contextRef}
                    elements={elements}
                    setElements={setElements}
                    tool={tool}
                    color={color}
                    user={user}
                    socket={socket}
                    // users={users}
                />
            </div>
            <div className="mt-10 w-4/5">
                <p className="font-semibold text-3xl">All Users</p>
                <div className="flex gap-5">
                    {
                        users.map((usr, i) => (
                            <p className="text-lg" key={i}>{usr?.name}{usr?.host ? " [host]" : ""} {user && user.userID===usr.userID && "(you)"}, </p>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8 mb-8 w-4/5">
                <p className="font-semibold text-3xl mb-2">Chat</p>
                <Chat socket={socket}/>
            </div>
        </div>
    )
}

export default RoomPage