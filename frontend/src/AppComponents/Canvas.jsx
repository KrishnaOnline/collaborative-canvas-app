import { useEffect, useLayoutEffect, useState } from "react"
import rough from "roughjs"
import RoomPage from "@/Pages/RoomPage"

const roughGenerator = rough.generator()

const Canvas = ({canvasRef, contextRef, elements, setElements}) => {
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        contextRef.current = context
    }, [])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current)
        elements.forEach((element) => {
            roughCanvas.linearPath(element.path)
        })
    }, [elements])

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
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
        // console.log(offsetX, offsetY)
        setIsDrawing(true)
    }
    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if(isDrawing) {
            // console.log(offsetX, offsetY)
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
        }
    }
    const handleMouseUp = (e) => {
        setIsDrawing(false)
        // const {offsetX, offsetY} = e.nativeEvent
        // console.log(offsetX, offsetY)
    }

    return (
        <>
            {/* {JSON.stringify(elements)} */}
            <canvas 
                className="bg-white h-full w-full border-black border-4"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            ></canvas>
        </>
    )
}

export default Canvas