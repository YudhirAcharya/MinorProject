import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  babel: {
    configFile: true, // Tells Vite to use the Babel configuration file
    rootMode: "upward", // Searches for Babel config file in parent directories
  },
});
