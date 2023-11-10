"use client"
import {useState, useEffect, useRef} from "react"

export default function DrawingPane() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.strokeStyle = "rgba(255, 255, 255, 1)" // set stroke color to white with 50% transparency
    context.lineWidth = 20
    context.lineCap = "round"
    context.lineJoin = "round"
    context.imageSmoothingEnabled = false // disable anti-aliasing

    function handleMouseDown(event) {
      setIsDrawing(true)
      context.beginPath()
      context.moveTo(event.clientX, event.clientY)
    }

    function handleMouseMove(event) {
      if (isDrawing) {
        context.lineTo(event.clientX, event.clientY)
        context.stroke()
      }
    }

    function handleMouseUp() {
      setIsDrawing(false)
      setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height)
      }, 500)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDrawing])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          backgroundSize: "cover",
          position: "relative",
          zIndex: 1,
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(/bg-1.jpg)`,
          backgroundSize: "cover",
        }}
      />
    </>
  )
}
