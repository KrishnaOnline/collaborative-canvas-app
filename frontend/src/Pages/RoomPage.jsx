import Canvas from "@/AppComponents/Canvas"
import { useEffect, useRef, useState } from "react"

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
        <div className="flex w-full justify-center flex-col mx-auto">
            <h1 className="text-center">Collaborative Canvas <span>[Users Online: {users.length}]</span></h1>
            {
                user && user.presenter && (
                    <div className="flex gap-10 mx-auto">
                        <div className="flex gap-3">
                            <div className="flex gap-1 items-center">
                                <label htmlFor="pencil">Pencil</label>
                                <input
                                    type="radio"
                                    name="tool"
                                    id="pencil"
                                    checked={tool==="pencil"}
                                    value="pencil"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-1 items-center">
                                <label htmlFor="line">Line</label>
                                <input
                                    type="radio"
                                    name="tool"
                                    id="line"
                                    checked={tool==="line"}
                                    value="line"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-1 items-center">
                                <label htmlFor="rect">Rectangle</label>
                                <input
                                    type="radio"
                                    name="tool"
                                    id="rect"
                                    checked={tool==="rect"}
                                    value="rect"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="flex gap-5">
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
                                disabled={elements.length===0}
                                onClick={undoHandler}
                            >Undo</button>
                            <button
                                disabled={history.length<1}
                                onClick={redoHandler}
                            >Redo</button>
                        </div>
                        <div>
                            <button onClick={handleClearCanvas}>Clear Canvas</button>
                        </div>
                    </div>
                )
            }
            <div className="mx-auto w-4/5">
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
            <div>
                Users...
                <div>
                    {
                        users.map((usr, i) => (
                            <p key={i}>{usr?.name}{usr?.host ? " (host)" : ""} {user && user.userID===usr.userID && "(you)"}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RoomPage