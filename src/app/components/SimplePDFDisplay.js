'use client';

import React, { useEffect, useState } from 'react';
import FallbackPDFViewer from './FallbackPDFViewer';

const SimplePDFDisplay = ({ pdfUrl }) => {
  // Estado para detectar si estamos en móvil
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Función para detectar el tamaño de pantalla
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Ejecutamos una vez al cargar y configuramos el listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Limpieza del evento al desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // En dispositivos móviles, usamos el FallbackPDFViewer
  if (isMobile) {
    return <FallbackPDFViewer pdfUrl={pdfUrl} />;
  }

  // En desktop seguimos usando el iframe con la configuración original
  const pdfUrlWithParams = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="w-full">
      {/* Enlace para abrir PDF en nueva página */}
      <div className="mb-4 text-center">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 underline text-sm hover:text-gray-700"
        >
          Abrir PDF en nueva página
        </a>
      </div>
      
      {/* Visor del PDF usando iframe - sin controles para desktop */}
      <div className="border border-gray-300 rounded shadow-lg bg-white overflow-hidden">
        <iframe
          src={pdfUrlWithParams}
          width="100%"
          height="700px"
          title="Fotopoemario PDF"
          className="rounded"
          style={{
            border: 'none',
            display: 'block',
            minHeight: '700px'
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default SimplePDFDisplay;