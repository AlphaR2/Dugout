/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: [
    "@solana/wallet-adapter-react-ui",
  ],
};

module.exports = config;
