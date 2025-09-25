'use client';

import React from 'react';

const SimplePDFDisplay = ({ pdfUrl }) => {
  // Agregar parámetros para ocultar la barra de herramientas del PDF
  const pdfUrlWithParams = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="w-full">
      {/* Visor del PDF usando iframe - sin controles */}
      <div className="border border-gray-300 rounded shadow-lg bg-white overflow-hidden">
        <iframe
          src={pdfUrlWithParams}
          width="100%"
          height="700px"
          title="Fotopoemario PDF"
          className="rounded"
          style={{
            border: 'none',
            display: 'block'
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default SimplePDFDisplay;