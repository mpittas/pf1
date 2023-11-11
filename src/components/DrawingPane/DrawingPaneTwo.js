"use client";
import React, { useRef, useEffect } from "react";
import _ from "lodash";

const DrawingPaneTwo = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let direction = true;

    context.lineJoin = "round";
    context.lineCap = "round";
    context.globalCompositeOperation = "source-over";

    function draw(e) {
      if (!isDrawing) return;
      context.strokeStyle = "black";
      context.lineWidth = 60;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    const throttledDraw = _.throttle(draw, 10);

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
      draw(e);
    });

    canvas.addEventListener("mousemove", throttledDraw);
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }, 2000);
    });
    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
      setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }, 1000);
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawingPaneTwo;
