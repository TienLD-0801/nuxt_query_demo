// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  hooks: {
    'pages:extend'(pages) {
      pages.push(
        {
          name: 'profile',
          path: '/muplti/:id/abc',
          file: '~/pages/index.vue',
        },
        {
          name: 'home',
          path: '/:id/abc',
          file: '~/pages/index.vue',
        }
      );
    },
  },
  plugins: [],
  vite: {
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    optimizeDeps: {
      esbuildOptions: {},
    },
  },
  runtimeConfig: {
    public: {
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    },
  },
  nitro: {
    experimental: {
      database: true,
    },
    database: {
      dbSqlDemo: {
        connector: 'sqlite',
        options: { name: 'db-sql-demo' },
      },
    },
  },
  modules: ['@nuxthub/core'],
  compatibilityDate: '2024-10-27',
});
