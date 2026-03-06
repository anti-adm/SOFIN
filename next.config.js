// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin(
  // Явно укажем путь, чтобы убрать любые сомнения резолва:
  "./src/i18n/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = withNextIntl(nextConfig);