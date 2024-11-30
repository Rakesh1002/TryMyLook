"use client";

import { useEffect, useRef } from "react";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  height?: number;
  width?: number;
}

export default function FlickeringGrid({
  className = "",
  squareSize = 4,
  gridGap = 6,
  color = "#9333ea",
  maxOpacity = 0.3,
  flickerChance = 0.1,
  height = 800,
  width = 800,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const squares: { x: number; y: number; opacity: number }[] = [];
    const cols = Math.floor(width / (squareSize + gridGap));
    const rows = Math.floor(height / (squareSize + gridGap));

    // Initialize squares
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        squares.push({
          x: i * (squareSize + gridGap),
          y: j * (squareSize + gridGap),
          opacity: Math.random() * maxOpacity,
        });
      }
    }

    let animationFrameId: number;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      squares.forEach((square) => {
        if (Math.random() < flickerChance) {
          square.opacity = Math.random() * maxOpacity;
        }

        context.fillStyle = color;
        context.globalAlpha = square.opacity;
        context.fillRect(square.x, square.y, squareSize, squareSize);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [squareSize, gridGap, color, maxOpacity, flickerChance, height, width]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
