"use client";
import { useState, useLayoutEffect, useRef, useEffect, useCallback } from "react";

/*
  AutoFit envuelve contenido y aplica un scale dinámico para que quepa sin scroll
  sin modificar el interior. Calcula la escala mínima necesaria basándose en
  ancho y alto disponibles dentro del contenedor padre.
*/
export default function AutoFit({ children, maxScale = 1, minScale = 0.5, safety = 0.99 }) {
  const outerRef = useRef(null); // espacio disponible
  const innerRef = useRef(null); // contenido real
  const [scale, setScale] = useState(1);

  const recalc = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    // Reset scale to 1 to measure real size
    inner.style.transform = "scale(1)";
    inner.style.transformOrigin = "top left";

    const availableW = outer.clientWidth;
    const availableH = outer.clientHeight;
    const neededW = inner.scrollWidth;
    const neededH = inner.scrollHeight;

    const ratioW = availableW / neededW;
    const ratioH = availableH / neededH;
    let nextScale = Math.min(maxScale, ratioW, ratioH, 1) * safety; // margen de seguridad
    if (nextScale < minScale) nextScale = minScale;
    setScale(nextScale);
  }, [maxScale, minScale, safety]);

  useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const ro = new ResizeObserver(() => recalc());
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, [recalc]);

  return (
  <div ref={outerRef} className="relative w-full h-full overflow-hidden">
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
      width: scale === 1 ? "100%" : undefined,
      // Evita cortes visuales en el borde inferior
      paddingBottom: scale < 1 ? 2 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
