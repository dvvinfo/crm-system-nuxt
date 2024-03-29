// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    // "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-icon",
    "@pinia/nuxt",

    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
      },
    ],
  ],
  shadcn: {
    prefix: "ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
