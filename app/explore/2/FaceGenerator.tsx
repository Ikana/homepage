"use client";

import React, { useEffect, useRef } from "react";

import { createNoise2D } from "simplex-noise";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const colors = [
      "#FFDFC4",
      "#F0D5BE",
      "#EECBAD",
      "#E3C26F",
      "#F1C27D",
      "#FFDBAC",
      "#F1C27D",
      "#E0AC69",
      "#C68642",
      "#8D5524",
    ];
    const eyeSizes = [5, 10, 15];
    const mouthWidths = [20, 30, 40];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Make sure the canvas fills the screen by setting its width and height to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Define grid parameters
    const rows = 2;
    const cols = 4;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    const faceRadius = Math.min(cellWidth, cellHeight) / 4; // half of the smaller dimension of the cell

    // Draw 8 faces in a grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Choose random variability parameters
        const color = colors[Math.floor(Math.random() * colors.length)];
        const eyeSize = eyeSizes[Math.floor(Math.random() * eyeSizes.length)];
        const mouthWidth =
          mouthWidths[Math.floor(Math.random() * mouthWidths.length)];

        // Calculate the center of the current cell
        const cellX = col * cellWidth + cellWidth / 2;
        const cellY = row * cellHeight + cellHeight / 2;

        const isSmiling = Math.random() > 0.5;

        // Draw a face in the current cell
        drawFace(
          context,
          cellX,
          cellY,
          faceRadius,
          color,
          eyeSize,
          mouthWidth,
          isSmiling
        );
      }
    }
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

function drawFace(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  baseRadius: number,
  color: string,
  baseEyeSize: number,
  mouthWidth: number,
  isSmiling: boolean
) {

  const noise2D = createNoise2D(Date.now);


  // Adjust radius and eye size using Perlin noise
  const radius = baseRadius * (1 + noise2D(x / 100, y / 100) / 2); // noise2D returns value between -1 and 1, so we normalize it to 0 to 1
  const eyeSize =
    baseEyeSize * (1 + noise2D((x + 50) / 100, (y + 50) / 100) / 2); // Adding 50 to x and y to get different noise values for eyes

  // Draw the face
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true); // Outer circle
  context.fillStyle = color;
  context.fill();

  // Draw the left eye
  context.beginPath();
  context.arc(x - radius / 2, y - radius / 2, eyeSize, 0, Math.PI * 2, true); // Left eye
  context.fillStyle = "black";
  context.fill();

  // Draw the right eye
  context.beginPath();
  context.arc(x + radius / 2, y - radius / 2, eyeSize, 0, Math.PI * 2, true); // Right eye
  context.fillStyle = "black";
  context.fill();

  // Draw the eyebrows
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x - radius / 2 - eyeSize / 2, y - radius / 2 - eyeSize);
  context.lineTo(x - radius / 2 + eyeSize / 2, y - radius / 2 - eyeSize);
  context.moveTo(x + radius / 2 - eyeSize / 2, y - radius / 2 - eyeSize);
  context.lineTo(x + radius / 2 + eyeSize / 2, y - radius / 2 - eyeSize);
  context.strokeStyle = "black";
  context.stroke();

  // Draw the nose
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + radius / 4);
  context.strokeStyle = "black";
  context.stroke();

  // Draw the mouth
  context.beginPath();
  context.moveTo(x - mouthWidth / 2, y + radius / 2);
  context.quadraticCurveTo(
    x,
    y + (isSmiling ? radius / 1.5 : radius / 2.5),
    x + mouthWidth / 2,
    y + radius / 2
  );
  context.strokeStyle = "black";
  context.stroke();
}
