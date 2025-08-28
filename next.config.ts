import { NextConfig } from "next/types";
const path = require("path");

const nextConfig: NextConfig = {
  env: {
    URL: process.env.URL,
    TOKEN_NAME: process.env.TOKEN_NAME,
    URL_PHOTO: process.env.SIMPLE_REST_URL_PHOTO,
  },

  // Оптимизация производительности
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./libs/mixins.scss";;`,
  },

  // Оптимизация изображений
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fishman-boy.ru",
      },
      {
        protocol: "https",
        hostname: "s3.timeweb.cloud",
      },
      {
        protocol: "https",
        hostname: "topframe.webtm.ru",
        pathname: "/api/uploads/**",
      },
    ],
  },

  webpack(config, { dev, isServer }) {
    // Оптимизация только для production

    // Grab the existing rule that handles SVG imports
    //@ts-ignore
    const fileLoaderRule = config.module.rules?.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
