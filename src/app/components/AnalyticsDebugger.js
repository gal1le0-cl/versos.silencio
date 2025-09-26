'use client';

import { useEffect, useState } from 'react';
import { checkAnalyticsStatus, showAnalyticsInfo, trackEvent } from '@/lib/analytics';

/**
 * Componente de debug para verificar Google Analytics
 * Solo se muestra en modo desarrollo
 * 
 * Para usarlo, agrégalo a cualquier página:
 * import AnalyticsDebugger from '@/components/AnalyticsDebugger';
 * <AnalyticsDebugger />
 */
export default function AnalyticsDebugger() {
  const [status, setStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      
      // Verificar estado después de que se cargue la página
      const timer = setTimeout(() => {
        const analyticsStatus = checkAnalyticsStatus();
        setStatus(analyticsStatus);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleTestEvent = () => {
    trackEvent('debug_test_click', {
      test_type: 'manual_button_click',
      source: 'analytics_debugger'
    });
    alert('Test event sent! Check the console for details.');
  };

  const handleShowInfo = () => {
    showAnalyticsInfo();
  };

  // No mostrar en producción
  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-sm z-50 border border-gray-600">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔍</span>
        <h3 className="font-bold text-sm">Analytics Debug</h3>
      </div>
      
      {status ? (
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span>{status.gtag ? '✅' : '❌'}</span>
            <span>gtag function</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{status.dataLayer ? '✅' : '❌'}</span>
            <span>dataLayer</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{status.ready ? '✅' : '❌'}</span>
            <span>Analytics Ready</span>
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-300">Checking status...</div>
      )}

      <div className="mt-3 space-y-2">
        <button
          onClick={handleTestEvent}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
        >
          Send Test Event
        </button>
        <button
          onClick={handleShowInfo}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors"
        >
          Show Full Info
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Only visible in development
      </div>
    </div>
  );
}