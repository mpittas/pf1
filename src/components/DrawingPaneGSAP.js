"use client"
import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { throttle } from "lodash"

export default function DrawingPaneGSAP() {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  let isDrawing = false
  let lastX = 0
  let lastY = 0

  useEffect(() => {
    // Update dimensions if window object is available
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 && dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    function draw(e) {
      if (!isDrawing) return
      ctx.strokeStyle = "#000"
      ctx.lineJoin = "round"
      ctx.lineWidth = 5
      ctx.globalCompositeOperation = "source-over"
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      ;[lastX, lastY] = [e.offsetX, e.offsetY]
    }

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true
      lastX = e.offsetX
      lastY = e.offsetY
    })

    canvas.addEventListener("mousemove", throttle(draw, 16))

    canvas.addEventListener("mouseup", () => {
      isDrawing = false
      gsap.to(canvas, { alpha: 1, duration: 1.25 })
    })

    canvas.addEventListener("mouseout", () => {
      isDrawing = false
      gsap.to(canvas, { alpha: 1, duration: 1.25 })
    })
  }, [dimensions])

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-1.jpg')" }}
      ></div>
    </div>
  )
}
