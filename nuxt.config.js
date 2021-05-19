export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "bsf-frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  server: {
    host: "0.0.0.0", // default: localhost,
    timing: false
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/toast.client.ts"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    axios: {
      baseURL: "http://localhost:1337" // Used as fallback if no runtime config is provided
    },

    publicRuntimeConfig: {
      axios: {
        browserBaseURL: process.env.BROWSER_BASE_URL
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: "en"
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]]
    }
  }
};
