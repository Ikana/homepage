"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createNoise2D } from 'simplex-noise';

const drawDiamond = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size / 2, y + size / 2);
  ctx.closePath();
  ctx.fill();
};

export default function IterativePattern() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const noise2D = createNoise2D();

  const drawPattern = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: string[],
    depth: number
  ) => {
    if (depth > 6) return; // base case

    const color = colors[depth % colors.length];

    // Add some Perlin noise to the size and position
    const noise = noise2D(x / 100, y / 100);
    const noisySize = size * (1 + noise / 2);
    const noisyX = x + (size * noise) / 4;
    const noisyY = y + (size * noise) / 4;

    // Draw the diamond at the current position
    drawDiamond(ctx, noisyX, noisyY, noisySize, color);

    // Draw diamonds around the current position
    const newSize = noisySize / 2;

    drawPattern(ctx, noisyX - newSize, noisyY, newSize, colors, depth + 1); // Left
    drawPattern(ctx, noisyX + newSize, noisyY, newSize, colors, depth + 1); // Right
    drawPattern(ctx, noisyX, noisyY - newSize, newSize, colors, depth + 1); // Top
    drawPattern(ctx, noisyX, noisyY + newSize, newSize, colors, depth + 1); // Bottom
  },[noise2D]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Make sure the canvas fills the screen by setting its width and height to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start drawing the pattern
    const colors = [
      "#e63946",
      "#f1faee",
      "#a8dadc",
      "#457b9d",
      "#1d3557",
      "#2a9d8f",
      "#e9c46a",
    ];

    drawPattern(context, canvas.width / 2, canvas.height / 2, 800, colors, 0);
  }, [drawPattern]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        {/* Fallback content for browsers that don't support Canvas */}
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}
