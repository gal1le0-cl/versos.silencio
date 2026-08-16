"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookies_accepted");
      setVisible(!stored);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookies_accepted", "1");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto bg-[#121418] text-white rounded-lg shadow-lg border border-neutral-700 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 text-sm leading-tight">
          <strong className="block font-semibold">Usamos cookies</strong>
          <span className="text-sm opacity-90">
            Esta página usa cookies para mejorar su uso; al usarla aceptas las condiciones.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://clogy.net/legal" className="text-sm underline text-neutral-200 hover:text-white">Leer condiciones</a>
          <button
            onClick={accept}
            className="inline-flex items-center gap-2 bg-white text-[#121418] font-semibold px-3 py-1.5 rounded-md shadow-sm hover:opacity-95"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
