'use client';

import React, { useState } from 'react';

const FallbackPDFViewer = ({ pdfUrl }) => {
  const [error, setError] = useState(null);

  const handleIframeError = () => {
    setError('Error cargando PDF con iframe');
  };

  return (
    <div className="w-full">
      {/* Enlace sencillo para abrir PDF en nueva página */}
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
      
      {error && (
        <div className="mb-4 text-center">
          <p className="text-gray-500 text-sm">
            Si no puedes visualizar correctamente el PDF, utiliza el enlace superior.
          </p>
        </div>
      )}

      {/* Visor del PDF con mayor altura para móvil */}
      <div className="border border-gray-300 rounded shadow-lg" style={{ height: '70vh', minHeight: '600px' }}>
        <iframe
          src={`${pdfUrl}#view=FitW`}
          width="100%"
          height="100%"
          title="PDF Viewer"
          onError={handleIframeError}
          className="rounded"
        />
      </div>
    </div>
  );
};

export default FallbackPDFViewer;