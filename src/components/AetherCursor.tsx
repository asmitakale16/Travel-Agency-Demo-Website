import { useEffect, useState } from "react";

export function AetherCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let rx = -100, ry = -100;
    let tx = -100, ty = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setPos({ x: tx, y: ty });
      const el = e.target as HTMLElement;
      const labelEl = el.closest<HTMLElement>("[data-cursor]");
      setLabel(labelEl ? labelEl.getAttribute("data-cursor") : null);
    };

    const loop = () => {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      setRingPos({ x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        className={`aether-cursor ${label ? "is-hover" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center aether-cursor-label">
            {label}
          </span>
        )}
      </div>
      <div
        className="aether-cursor-ring"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          opacity: label ? 0 : 1,
        }}
      />
    </>
  );
}
