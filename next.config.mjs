/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in ./out so it can be served by any static
  // host (Render Static Site, Netlify, Cloudflare Pages, GitHub Pages, …).
  output: "export",
  // Static hosts have no Next.js Image Optimization server, so emit plain
  // <img> tags. Source images are already sized via the img() helper.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  // Emit /route/index.html so nested routes resolve on static hosts and
  // survive a hard refresh without a 404.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
