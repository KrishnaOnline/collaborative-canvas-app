import { useEffect, useLayoutEffect, useState } from "react"
import rough from "roughjs"
import RoomPage from "@/Pages/RoomPage"

const roughGenerator = rough.generator()

const Canvas = ({canvasRef, contextRef, elements, setElements, tool, color, user, socket}) => {
    const [img, setImg] = useState(null)

    useEffect(() => {
        socket.on("canvasDataResponse", (data) => {
            setImg(data.imgURL)
        })
    }, [])

    if(!user?.presenter) {
        return (
            <div className="bg-white h-full w-full border-black border-[2px] rounded-3xl shadow-2xl overflow-hidden">
                {/*<canvas ref={canvasRef}/>*/}
                <img
                    src={img}
                    alt="Real time Canvas"
                    // className="w-full h-full"
                    style={{
                        height: window.innerHeight*4/5,
                        width: "300%",
                    }}
                />
            </div>
        )
    }

    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.height = window.innerHeight*4/5
        canvas.width = window.innerWidth
        const context = canvas.getContext("2d")
        context.strokeStyle = color
        context.lineWidth = 2
        context.lineCap = "round"
        contextRef.current = context
    }, [])

    useEffect(() => {
        contextRef.current.strokeStyle = color
    }, [color])

    useLayoutEffect(() => {
        if(canvasRef) {
            const roughCanvas = rough.canvas(canvasRef.current)
            if(elements.length > 0) {
                contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            }
            elements.forEach((element) => {
                if(element.type==="pencil") {
                    roughCanvas.linearPath(element.path, {
                        stroke: element.stroke,
                        strokeWidth: 2.5,
                        roughness: 0
                    })
                } else if(element.type==="line") {
                    roughCanvas.draw(
                        roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {
                            stroke: element.stroke,
                            strokeWidth: 2.5,
                            roughness: 0
                        })
                    )
                } else if(element.type==="rect") {
                    roughCanvas.draw(
                        roughGenerator.rectangle(
                            element.offsetX, element.offsetY, element.width, element.height, {
                                stroke: element.stroke,
                                strokeWidth: 2.5,
                                roughness: 0
                            }
                        )
                    )
                }
            })
            const canvasImg = canvasRef.current.toDataURL()
            socket.emit("canvasData", canvasImg)
        }
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
                    stroke: color
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
                    stroke: color
                }
            ])
        } else if(tool==="rect") {
            setElements(prevElems => [
                ...prevElems,
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color
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
                                width: offsetX-ele.offsetX,
                                height: offsetY-ele.offsetY,
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
            className="bg-white h-full w-full border-black border-[2px] rounded-3xl shadow-2xl overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Canvas