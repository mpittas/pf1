"use client"
import {useEffect, useRef} from "react"

function DrawingPane2() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size to match screen size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Set background image
    const bgImage = new Image()
    bgImage.src = "/bg-1.jpg"
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    }

    // Set blending mode to overlay
    ctx.globalCompositeOperation = "overlay"

    // Set up mouse event listeners
    let isDrawing = false
    let lastX = 0
    let lastY = 0

    function handleMouseDown(e) {
      isDrawing = true
      lastX = e.clientX
      lastY = e.clientY
    }

    function handleMouseMove(e) {
      if (!isDrawing) return

      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(e.clientX, e.clientY)
      ctx.strokeStyle = "white" // Set stroke color to white
      ctx.lineWidth = 20 // Set line width to 5
      ctx.stroke()

      lastX = e.clientX
      lastY = e.clientY
    }

    function handleMouseUp() {
      isDrawing = false
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default DrawingPane2
