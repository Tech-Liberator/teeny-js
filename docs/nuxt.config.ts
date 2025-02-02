import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ["@nuxt-themes/docus"],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
  ],
  compatibilityDate: "2024-10-24",
});
