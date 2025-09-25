/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Configuración para webpack (funciona tanto para webpack como para Turbopack)
  webpack: (config, { isServer }) => {
    // Configuración para react-pdf
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    // Ignorar canvas en el servidor
    if (isServer) {
      config.externals = [...config.externals, 'canvas'];
    }

    return config;
  },
};

module.exports = nextConfig;
