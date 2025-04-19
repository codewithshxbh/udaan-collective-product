let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable React strict mode
  reactStrictMode: false,
  // Set valid development indicators
  devIndicators: {
    // position must be one of: top-left, top-right, bottom-left, bottom-right
    position: "bottom-right",
  },
  // Advanced compiler options
  compiler: {
    // Remove all console.* statements in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Required to disable webpack performance hints
  webpack: (config, { dev, isServer }) => {
    // Disable performance hints
    config.performance = {
      hints: false,
    };
    
    if (!dev && !isServer) {
      // Disable source maps in client production build
      config.devtool = false;
    }
    
    return config;
  },
  // Disabling experimental features that may cause build issues
  experimental: {
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
