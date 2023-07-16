"use client";

import React, { useEffect, useRef } from "react";
import { createNoise4D } from "simplex-noise";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hueRef = useRef<number>(0);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const noiseScale = 0.01;
  const thicknessScale = 5; // Max thickness of the line
  const requestRef = useRef<number>();

  const draw = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    hue: number,
    thickness: number
  ) => {
    context.beginPath();
    context.arc(x, y, thickness, 0, Math.PI * 2);
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.lineWidth = thickness;
    context.stroke();
  };

  const thicknessRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const noise4D = createNoise4D();
    let t = 0; // Time for the noise function

    const animate = () => {
      hueRef.current =
        (hueRef.current +
          (noise4D(xRef.current * noiseScale, yRef.current * noiseScale, t, 0) +
            1) *
            180) %
        360;
      thicknessRef.current = Math.abs(
        noise4D(xRef.current * noiseScale, yRef.current * noiseScale, t, 0) *
          thicknessScale
      );

      const moveX =
        noise4D(xRef.current * noiseScale, yRef.current * noiseScale, t, 0) *
        10; // Move the stylus in x direction
      const moveY =
        noise4D(xRef.current * noiseScale, yRef.current * noiseScale, t, 0.5) *
        10; // Move the stylus in y direction

      // If the stylus goes out of bounds in x direction, invert its direction
      if (xRef.current + moveX < 0 || xRef.current + moveX > canvas.width) {
        xRef.current -= moveX;
      } else {
        xRef.current += moveX;
      }

      // If the stylus goes out of bounds in y direction, invert its direction
      if (yRef.current + moveY < 0 || yRef.current + moveY > canvas.height) {
        yRef.current -= moveY;
      } else {
        yRef.current += moveY;
      }

      // Add a "gravity" effect
      const gravityScale = 0.025;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Calculate the direction of gravity
      const gravityX = (centerX - xRef.current) * gravityScale;
      const gravityY = (centerY - yRef.current) * gravityScale;

      // Apply the gravity effect
      xRef.current += gravityX;
      yRef.current += gravityY;

      draw(
        context,
        xRef.current,
        yRef.current,
        hueRef.current,
        thicknessRef.current
      );
      t += 0.01; // Increase time
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        {/* Fallback content for browsers that don't support Canvas */}
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}
