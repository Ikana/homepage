'use client'

import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

// Function to convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch(i % 6){
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    default: r = 1, g = 1, b = 1;
  }

  return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const noise2D = createNoise2D(Math.random);

    // Define properties of the hexagon
    const sideLength = 20; // Length of each side

    // Calculate the distance to the next point
    const xDist = sideLength * Math.cos(Math.PI / 6); 
    const yDist = sideLength * Math.sin(Math.PI / 6);
    const colWidth = 2 * xDist;
    const rowHeight = sideLength + yDist;

    // Calculate the number of rows and columns based on window size and hexagon size
    const numRows = Math.ceil(window.innerHeight / rowHeight);
    const numCols = Math.ceil(window.innerWidth / colWidth);

    // Loop through rows and columns to draw hexagons
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let xOffset = j * colWidth + ((i % 2) === 0 ? 0 : xDist);
        let yOffset = i * rowHeight;

        // Draw hexagon
        context.beginPath();
        context.moveTo(xOffset, yOffset - sideLength); // top point
        context.lineTo(xOffset + xDist, yOffset - yDist); // top right point
        context.lineTo(xOffset + xDist, yOffset + yDist); // bottom right point
        context.lineTo(xOffset, yOffset + sideLength); // bottom point
        context.lineTo(xOffset - xDist, yOffset + yDist); // bottom left point
        context.lineTo(xOffset - xDist, yOffset - yDist); // top left point
        context.closePath();

        // Use noise to get a hue between 0 and 360 (for all colors)
        let hue = ((noise2D(i / numRows, j / numCols) + 1) / 2) * 360;
        
        // Style hexagon
        context.fillStyle = hsvToRgb(hue / 360, 0.5, 0.8); // Interesting shades of colors
        context.fill();
      }
    }

  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
