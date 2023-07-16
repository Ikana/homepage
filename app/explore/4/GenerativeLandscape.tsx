'use client'

import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

const colors = [
  "#e63946", // Imperial Red
  "#f1faee", // Honeydew
  "#a8dadc", // Powder Blue
  "#457b9d", // Steel Blue
  "#1d3557", // Prussian Blue
  "#2a9d8f", // Persian Green
  "#e9c46a", // Sandy Brown
];


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
    const gridSize = 10; // Base size of each grid cell
    const noiseScale = 0.5; // Scale of the noise
    const threshold = 0.7; // Threshold to decide if a cell is a road or building


    function getColor(x: number, y: number) {
      // Generate noise value
      const noiseValue = noise2D(x * noiseScale, y * noiseScale);
    
      // Normalize noise value to [0, 1]
      const normalizedNoise = (noiseValue + 1) / 2;
    
      // Convert normalized noise value to an index
      const index = Math.floor(normalizedNoise * colors.length);
    
      // Return color from colors array
      return colors[index];
    }

    for(let x = 0; x < canvas.width; x += gridSize) {
      for(let y = 0; y < canvas.height; y += gridSize) {
        const widthNoise = noise2D(x * noiseScale, y * noiseScale);
        const heightNoise = noise2D((x + 100) * noiseScale, (y + 100) * noiseScale); // Offset to generate different noise

        // randomly select the bigger value of widthNoise and heightNoise
        const biggerNoise = noise2D(widthNoise, heightNoise * 200) > 0;
        const widthFactor = biggerNoise ? 1 : 15;
        const heightFactor = biggerNoise ? 15 : 1;

        // Map noise values from [-1, 1] to [1, 4], then multiply by gridSize to get block width and height
        const blockWidth = gridSize * Math.round(mapNoiseValue(widthNoise, 1, widthFactor));
        const blockHeight = gridSize * Math.round(mapNoiseValue(heightNoise, 1, heightFactor));

        if(widthNoise > threshold) {
          context.fillStyle = getColor(widthNoise,heightNoise * 200); 
        } else {
          continue;
        }

        context.fillRect(x, y, blockWidth, blockHeight);
      }
    }

    function mapNoiseValue(noiseValue: number, min: number, max: number) {
      return min + ((noiseValue + 1) / 2) * (max - min); // Maps value from [-1, 1] to [min, max]
    }

  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}

