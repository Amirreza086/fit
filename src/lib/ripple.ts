import * as React from "react";

function setRippleVars(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--rx", `${Math.max(0, Math.min(100, x))}%`);
  el.style.setProperty("--ry", `${Math.max(0, Math.min(100, y))}%`);
}

export function ripplePointerDown<T extends HTMLElement>(
  userHandler?: React.PointerEventHandler<T>
): React.PointerEventHandler<T> {
  return (e) => {
    const el = e.currentTarget as unknown as HTMLElement;
    // Only set when element uses ripple class; safe no-op otherwise.
    if (el.classList.contains("ripple")) {
      setRippleVars(el, e.clientX, e.clientY);
    }
    userHandler?.(e);
  };
}
