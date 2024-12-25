// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/leaflet'],
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

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  nitro: {
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public',
    },
    routeRules: {
      'api/**': {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json, text/plain, */*, charset=utf-8',
        },
      },
    },
  },

  compatibilityDate: '2024-10-31',
});
