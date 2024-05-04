import Canvas from "@/AppComponents/Canvas"
import { useRef, useState } from "react"

const RoomPage = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState("black")
    const [elements, setElements] = useState([])

    return (
        <div className="flex w-full justify-center flex-col mx-auto">
            <h1 className="text-center">Collaborative Canvas <span>[Users Online: 0]</span></h1>
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
                <div>
                    <button>Undo</button>
                    <button>Redo</button>
                </div>
                <div>
                    <button>Clear Canvas</button>
                </div>
            </div>
            <div className="mx-auto w-4/5">
                <Canvas 
                    canvasRef={canvasRef} 
                    contextRef={contextRef}
                    elements={elements}
                    setElements={setElements}
                    tool={tool}
                />
            </div>
        </div>
    )
}

export default RoomPage