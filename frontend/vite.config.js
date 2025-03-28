import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config({ path: "../../" });

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@stores": path.resolve(__dirname, "./src/stores"),
    },
  },
});
