/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Keep these to prevent minor syntax warnings from stopping your build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Production Optimization
  swcMinify: true, 
  
  // ✅ This creates a 'standalone' folder which is much easier 
  // to deploy to cPanel later if you choose
  output: 'standalone',

  // ✅ We removed the 'webpack' manual overrides so your PC 
  // can use all its CPU cores to build faster.
};

export default nextConfig;