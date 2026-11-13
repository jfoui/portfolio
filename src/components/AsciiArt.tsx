"use client";

import { useEffect, useRef } from "react";

// "JI" monogram. "#" is part of a letter, " " is background.
const ART = [
  " #####  ######",
  "     #    #   ",
  "     #    #   ",
  "     #    #   ",
  "     #    #   ",
  "     #    #   ",
  "     #    #   ",
  " #   #    #   ",
  " #   #    #   ",
  "  ###   ######",
];

const BG_CHARS = ["·", ".", ":", " "];
const HOT_CHARS = ["*", "#", "@"];

// Deterministic pseudo-random value for a cell (0..1). Stable across renders,
// so the abstract shape doesn't jump around.
const hash = (r: number, c: number) => {
  const x = Math.sin(r * 127.1 + c * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const ACCENT = "#2fbf71";
const INK = "#e8e8e8";
const MUTED = "#5c5c5c";
const MID = "#7fb894";

// Canvas size (matches the old photo slot, 320x400).
const W = 320;
const H = 400;
const FONT_SIZE = 24;

export default function AsciiArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    ctx.font = `${FONT_SIZE}px ui-monospace, "SF Mono", Menlo, monospace`;
    ctx.textBaseline = "top";
    const charW = ctx.measureText("M").width;
    const cols = Math.floor(W / charW);
    const rows = Math.floor(H / FONT_SIZE);

    // Center the "JI" art in the grid.
    const artH = ART.length;
    const artW = ART[0].length;
    const offX = Math.floor((cols - artW) / 2);
    const offY = Math.floor((rows - artH) / 2);

    // Which grid cells are part of a letter.
    const isLetter: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
      isLetter[r] = [];
      for (let c = 0; c < cols; c++) {
        const ar = r - offY;
        const ac = c - offX;
        isLetter[r][c] =
          ar >= 0 && ar < artH && ac >= 0 && ac < artW && ART[ar][ac] === "#";
      }
    }

    // One stable background character per cell.
    const bgChar: string[][] = [];
    for (let r = 0; r < rows; r++) {
      bgChar[r] = [];
      for (let c = 0; c < cols; c++) {
        bgChar[r][c] =
          BG_CHARS[Math.floor(Math.random() * BG_CHARS.length)];
      }
    }

    // Abstract shape: background characters only appear inside an organic
    // blob (denser near the center, fading irregularly outward), never as a
    // full rectangle. The "JI" letters are always drawn.
    const present: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
      present[r] = [];
      for (let c = 0; c < cols; c++) {
        if (isLetter[r][c]) {
          present[r][c] = true;
          continue;
        }
        // Normalized distance from the center (-1..1), stretched so the
        // blob is taller than it is wide.
        const nx = (c - cols / 2) / (cols / 2);
        const ny = (r - rows / 2) / (rows / 2);
        const d = Math.sqrt(nx * nx * 1.4 + ny * ny);
        // Wavy edge: the noise breaks the outline so it is not a circle.
        const edge = 1 - d * 0.8 + (hash(r, c) - 0.5) * 0.55;
        present[r][c] = edge > 0.32;
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const m = mouseRef.current;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Outside the abstract shape: draw nothing.
          if (!present[r][c]) continue;
          const x = c * charW;
          const y = r * FONT_SIZE;
          const cx = x + charW / 2;
          const cy = y + FONT_SIZE / 2;
          let ch: string;
          let color: string;
          if (isLetter[r][c]) {
            ch = "#";
            color = INK;
          } else {
            ch = bgChar[r][c];
            color = MUTED;
          }
          // Characters near the cursor light up.
          if (m) {
            const d = Math.hypot(cx - m.x, cy - m.y);
            if (d < 36) {
              ch = HOT_CHARS[Math.floor(Math.random() * HOT_CHARS.length)];
              color = ACCENT;
            } else if (d < 80) {
              ch = "+";
              color = MID;
            }
          }
          ctx.fillStyle = color;
          ctx.fillText(ch, x, y);
        }
      }
    };

    draw();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      requestAnimationFrame(draw);
    };
    const onLeave = () => {
      mouseRef.current = null;
      draw();
    };
    const onClick = () => {
      // Scramble the background a few times, then settle.
      for (let i = 0; i < 5; i++) {
        window.setTimeout(() => {
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (present[r][c] && !isLetter[r][c] && Math.random() < 0.4) {
                bgChar[r][c] =
                  BG_CHARS[Math.floor(Math.random() * BG_CHARS.length)];
              }
            }
          }
          draw();
        }, i * 60);
      }
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    // Gentle idle flicker: change a few background characters.
    const id = window.setInterval(() => {
      for (let i = 0; i < 6; i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (present[r][c] && !isLetter[r][c]) {
          bgChar[r][c] =
            BG_CHARS[Math.floor(Math.random() * BG_CHARS.length)];
        }
      }
      draw();
    }, 140);

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div
      className="flex h-[400px] w-[320px] items-center justify-center"
      role="img"
      aria-label="Interactive ASCII art of the initials J I. Move your cursor over it, click to scramble."
    >
      <canvas ref={canvasRef} className="h-[400px] w-[320px] cursor-crosshair" />
    </div>
  );
}
