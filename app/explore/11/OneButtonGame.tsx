"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();
  const angleRef = useRef<number>(0); // keep track of the angle
  const [direction, setDirection] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const pendulumLength = 200;
  const swingSpeed = 0.01;

  // Create the triangles

  const triangles = useRef<
    Array<{ x: number; y: number; dx: number; dy: number }>
  >([]);

  // Create the triangles once at the start
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const distance =
        (Math.random() * 0.75 + 0.25) *
        Math.min(window.innerWidth, window.innerHeight);
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      triangles.current.push({
        x: window.innerWidth / 2 + Math.cos(angle) * distance,
        y: window.innerHeight / 2 + Math.sin(angle) * distance,
        dx: dx,
        dy: dy,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Make sure the canvas fills the screen by setting its width and height to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderFrame = () => {
      if (!context) return;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the position of the circle
      const circleX =
        canvas.width / 2 + Math.sin(angleRef.current) * pendulumLength;
      const circleY =
        canvas.height / 2 + Math.cos(angleRef.current) * pendulumLength;

      // Draw the circle
      context.fillStyle = "white"; // set fill color
      context.beginPath();
      context.arc(circleX, circleY, 20, 0, 2 * Math.PI);
      context.fill();

      // Draw the triangles
      triangles.current.forEach((triangle, index) => {
        const triangleX = triangle.x;
        const triangleY = triangle.y;
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(triangleX, triangleY);
        context.lineTo(triangleX + 10, triangleY + 20);
        context.lineTo(triangleX - 10, triangleY + 20);
        context.closePath();
        context.fill();

        // Move the triangle
        triangle.x += triangle.dx;
        triangle.y += triangle.dy;

        // Create a slight random change in direction
        const changeAngle = (Math.random() - 0.5) * 0.01;
        const newDx =
          triangle.dx * Math.cos(changeAngle) -
          triangle.dy * Math.sin(changeAngle);
        const newDy =
          triangle.dx * Math.sin(changeAngle) +
          triangle.dy * Math.cos(changeAngle);
        triangle.dx = newDx;
        triangle.dy = newDy;

        if (triangle.x < 0 || triangle.x > window.innerWidth) {
          triangle.dx *= -1;
        }
        if (triangle.y < 0 || triangle.y > window.innerHeight) {
          triangle.dy *= -1;
        }        

        // Check if the circle "eats" the triangle
        const distance = Math.hypot(circleX - triangleX, circleY - triangleY);
        if (distance < 20) {
          setScore((score) => score + 1);
          triangles.current.splice(index, 1);
        }
      });

      // Update the angle
      angleRef.current += direction * swingSpeed;

      requestRef.current = requestAnimationFrame(renderFrame);
    };

    requestRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [direction]);

  // separate useEffect for click event listener
  useEffect(() => {
    const handleClick = () => {
      setDirection(-direction); // change the direction
    };

    window.addEventListener("click", handleClick);

    // cleanup function to remove event listener
    return () => window.removeEventListener("click", handleClick);
  }, [direction]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="absolute bottom-0 right-0 text-white p-4">
        Score: {score}
      </div>
      <canvas ref={canvasRef} className="w-full h-full">
        {/* Fallback content for browsers that don't support Canvas */}
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}
