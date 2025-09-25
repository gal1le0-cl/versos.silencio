'use client';

import React, { useState } from 'react';

const FallbackPDFViewer = ({ pdfUrl }) => {
  const [viewerType, setViewerType] = useState('iframe');
  const [error, setError] = useState(null);

  const handleIframeError = () => {
    setError('Error cargando PDF con iframe');
  };

  return (
    <div className="w-full">
      {/* Selector de método de visualización */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-semibold text-blue-800 mb-2">Método de visualización:</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setViewerType('iframe')}
            className={`px-3 py-1 rounded text-sm ${
              viewerType === 'iframe' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Iframe
          </button>
          <button
            onClick={() => setViewerType('object')}
            className={`px-3 py-1 rounded text-sm ${
              viewerType === 'object' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Object
          </button>
          <button
            onClick={() => setViewerType('embed')}
            className={`px-3 py-1 rounded text-sm ${
              viewerType === 'embed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Embed
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded text-sm bg-green-100 text-green-600 hover:bg-green-200"
          >
            Abrir en nueva pestaña
          </a>
        </div>
      </div>

      {/* Información de debugging */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
        <strong>URL del PDF:</strong> {pdfUrl}<br/>
        <strong>Método actual:</strong> {viewerType}<br/>
        <strong>Estado:</strong> {error ? `Error: ${error}` : 'OK'}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Visor del PDF */}
      <div className="border border-gray-300 rounded shadow-lg" style={{ height: '600px' }}>
        {viewerType === 'iframe' && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title="PDF Viewer"
            onError={handleIframeError}
            className="rounded"
          />
        )}

        {viewerType === 'object' && (
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            className="rounded"
          >
            <p className="p-4 text-center">
              Tu navegador no puede mostrar PDFs directamente. 
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                Haz clic aquí para descargarlo
              </a>
            </p>
          </object>
        )}

        {viewerType === 'embed' && (
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            className="rounded"
          />
        )}
      </div>

      {/* Información adicional */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Si ninguno de los métodos funciona, es posible que tu navegador no soporte 
        la visualización de PDFs embebidos. Usa el botón &quot;Abrir en nueva pestaña&quot; arriba.
      </div>
    </div>
  );
};

export default FallbackPDFViewer;