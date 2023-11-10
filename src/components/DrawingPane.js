"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

export default function DrawingPane() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [lineWidth, setLineWidth] = useState(40) // Set initial line width

  const handleMouseDown = (event) => {
    setIsDrawing(true)
    setOpacity(1)
    setLineWidth(40) // Reset line width on new stroke
    const context = canvasRef.current.getContext("2d")
    context.beginPath()
    context.moveTo(event.clientX, event.clientY)
  }

  const handleMouseMove = (event) => {
    if (!isDrawing) return
    const context = canvasRef.current.getContext("2d")
    context.lineWidth = lineWidth
    context.lineTo(event.clientX, event.clientY)
    context.stroke()
    setLineWidth((width) => Math.max(width - 0.5, 1)) // Gradually decrease line width
    setOpacity((opacity) => Math.max(opacity - 0.01, 0)) // decrease opacity
    context.strokeStyle = `rgba(255, 255, 255, ${opacity})` // update stroke color with new opacity
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    gsap.to(canvas, {
      duration: 0.5,
      alpha: 0,
      onComplete: () => {
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        gsap.to(canvas, { duration: 0.5, alpha: 1 })
      },
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.strokeStyle = `rgba(255, 255, 255, ${opacity})` // set stroke color to white with variable transparency
    context.lineCap = "round"
    context.lineJoin = "round"
    context.imageSmoothingEnabled = false // disable anti-aliasing

    const eventHandlers = [
      ["mousedown", handleMouseDown],
      ["mousemove", handleMouseMove],
      ["mouseup", handleMouseUp],
    ]

    eventHandlers.forEach(([event, handler]) => {
      canvas.addEventListener(event, handler)
    })

    return () => {
      eventHandlers.forEach(([event, handler]) => {
        canvas.removeEventListener(event, handler)
      })
    }
  }, [isDrawing, opacity, lineWidth]) // Add lineWidth to dependency array

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

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
