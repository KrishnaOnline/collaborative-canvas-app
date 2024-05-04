import { useEffect, useLayoutEffect, useState } from "react"
import rough from "roughjs"
import RoomPage from "@/Pages/RoomPage"

const roughGenerator = rough.generator()

const Canvas = ({canvasRef, contextRef, elements, setElements, tool}) => {
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.height = window.innerHeight*4/5
        canvas.width = window.innerWidth
        const context = canvas.getContext("2d")
        contextRef.current = context
    }, [])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current)
        if(elements.length > 0) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        elements.forEach((element) => {
            if(element.type==="pencil") {
                roughCanvas.linearPath(element.path)
            } else if(element.type==="line") {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height)
                )
            } else if(element.type==="rect") {
                roughCanvas.draw(
                    roughGenerator.rectangle(
                        element.offsetX, element.offsetY, element.width, element.height
                    )
                )
            }
        })
    }, [elements])

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if(tool==="pencil") {
            setElements((prevElems) => [
                ...prevElems,
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: "black"
                }
            ])
        } else if(tool==="line") {
            setElements(prevElems => [
                ...prevElems,
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: "black",

                }
            ])
        } else if(tool==="rect") {
            setElements(prevElems => [
                ...prevElems,
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: "black"
                }
            ])
        }
        // console.log(offsetX, offsetY)
        setIsDrawing(true)
    }
    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if(isDrawing) {
            // console.log(offsetX, offsetY)
            if(tool==="pencil") {
                const {path} = elements[elements.length-1]
                const newPath = [...path, [offsetX, offsetY]]
                setElements((prevElems) => 
                    prevElems.map((ele, index) => {
                        if(index===elements.length-1) {
                            return {
                                ...ele,
                                path: newPath
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            } else if(tool==="line") {
                setElements(prevElems => 
                    prevElems.map((ele, index) => {
                        if(index===elements.length-1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY,
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            } else if(tool==="rect") {
                setElements(prevElems => 
                    prevElems.map((ele, index) => {
                        if(index===elements.length-1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY,
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            }
        }
    }
    const handleMouseUp = (e) => {
        setIsDrawing(false)
        // const {offsetX, offsetY} = e.nativeEvent
        // console.log(offsetX, offsetY)
    }

    return (
        <div 
            className="bg-white h-full w-full border-black border-4 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Canvas