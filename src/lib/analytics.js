/**
 * Utilidades para Google Analytics 4
 * Funciones helper para trackear eventos personalizados
 */

// Variable para controlar el modo debug
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Función para verificar si gtag está disponible
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
};

// Función para logs de debug
const debugLog = (message, data = null) => {
  if (DEBUG_MODE) {
    console.group('🔍 Analytics Debug');
    console.log(message);
    if (data) {
      console.log('Data:', data);
    }
    console.log('gtag disponible:', isGtagAvailable());
    console.log('Timestamp:', new Date().toLocaleTimeString());
    console.groupEnd();
  }
};

/**
 * Trackea un evento personalizado
 * @param {string} eventName - Nombre del evento
 * @param {Object} parameters - Parámetros del evento
 */
export const trackEvent = (eventName, parameters = {}) => {
  const eventData = {
    ...parameters,
    timestamp: new Date().toISOString(),
  };

  debugLog(`📊 Tracking event: ${eventName}`, eventData);

  if (isGtagAvailable()) {
    window.gtag('event', eventName, eventData);
    debugLog('✅ Event sent successfully');
  } else {
    debugLog('❌ gtag not available - event not sent');
  }
};

/**
 * Trackea visualización de página
 * @param {string} pageTitle - Título de la página
 * @param {string} pagePath - Ruta de la página
 */
export const trackPageView = (pageTitle, pagePath) => {
  if (isGtagAvailable()) {
    window.gtag('config', 'G-3H2LGZQ9NE', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
    });
  }
};

/**
 * Trackea clicks en elementos específicos
 * @param {string} elementName - Nombre del elemento
 * @param {string} section - Sección donde se encuentra
 */
export const trackClick = (elementName, section = null) => {
  trackEvent('click', {
    element_name: elementName,
    section: section,
  });
};

/**
 * Trackea tiempo de lectura en páginas
 * @param {string} contentType - Tipo de contenido (artículo, poema, etc.)
 * @param {number} readingTime - Tiempo en segundos
 */
export const trackReadingTime = (contentType, readingTime) => {
  trackEvent('reading_time', {
    content_type: contentType,
    reading_time_seconds: readingTime,
    engagement_level: readingTime > 30 ? 'high' : readingTime > 10 ? 'medium' : 'low',
  });
};

/**
 * Trackea interacciones con el PDF
 * @param {string} action - Acción realizada (open, download, share)
 * @param {string} pdfName - Nombre del PDF
 */
export const trackPDFInteraction = (action, pdfName = 'fotopoemario') => {
  trackEvent('pdf_interaction', {
    action: action,
    pdf_name: pdfName,
  });
};

/**
 * Trackea navegación entre secciones
 * @param {string} fromSection - Sección origen
 * @param {string} toSection - Sección destino
 */
export const trackNavigation = (fromSection, toSection) => {
  trackEvent('navigation', {
    from_section: fromSection,
    to_section: toSection,
  });
};

/**
 * Trackea errores de la aplicación
 * @param {string} errorType - Tipo de error
 * @param {string} errorMessage - Mensaje del error
 */
export const trackError = (errorType, errorMessage) => {
  trackEvent('app_error', {
    error_type: errorType,
    error_message: errorMessage,
    fatal: false,
  });
};

/**
 * Función para verificar el estado de Google Analytics
 * Útil para debugging y verificación
 */
export const checkAnalyticsStatus = () => {
  console.group('🔍 Google Analytics Status Check');
  
  // Verificar si estamos en el cliente
  if (typeof window === 'undefined') {
    console.log('❌ Running on server side - Analytics not available');
    console.groupEnd();
    return {
      status: 'server-side',
      gtag: false,
      dataLayer: false
    };
  }

  // Verificar gtag
  const gtagAvailable = typeof window.gtag !== 'undefined';
  console.log(`gtag function: ${gtagAvailable ? '✅' : '❌'} ${gtagAvailable ? 'Available' : 'Not found'}`);

  // Verificar dataLayer
  const dataLayerAvailable = typeof window.dataLayer !== 'undefined';
  console.log(`dataLayer: ${dataLayerAvailable ? '✅' : '❌'} ${dataLayerAvailable ? 'Available' : 'Not found'}`);

  // Verificar configuración GA4
  if (dataLayerAvailable) {
    const gaConfig = window.dataLayer.find(item => 
      item[0] === 'config' && item[1] && item[1].startsWith('G-')
    );
    console.log(`GA4 Config: ${gaConfig ? '✅' : '❌'} ${gaConfig ? gaConfig[1] : 'Not found'}`);
  }

  // Test event (solo en desarrollo)
  if (DEBUG_MODE && gtagAvailable) {
    console.log('🧪 Sending test event...');
    window.gtag('event', 'analytics_test', {
      test_parameter: 'analytics_working',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Test event sent');
  }

  console.groupEnd();

  return {
    status: 'client-side',
    gtag: gtagAvailable,
    dataLayer: dataLayerAvailable,
    ready: gtagAvailable && dataLayerAvailable
  };
};

/**
 * Función de utilidad para mostrar información detallada de Analytics
 * Solo funciona en desarrollo
 */
export const showAnalyticsInfo = () => {
  if (!DEBUG_MODE) {
    console.log('Analytics info only available in development mode');
    return;
  }

  const status = checkAnalyticsStatus();
  
  if (status.ready) {
    console.log('🎉 Google Analytics is ready!');
    console.log('Next steps:');
    console.log('1. Navigate between pages to test tracking');
    console.log('2. Open Google Analytics Real-time reports');
    console.log('3. Check browser Network tab for gtag requests');
  } else {
    console.log('❌ Google Analytics setup incomplete');
    console.log('Troubleshooting:');
    console.log('1. Check if @next/third-parties is installed');
    console.log('2. Verify GoogleAnalytics component is in layout.js');
    console.log('3. Confirm GA measurement ID is correct');
  }
};