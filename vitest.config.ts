import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Default environment for API route and lib tests (no DOM needed)
    environment: "node",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/tests/unit/**/*.test.ts", "src/tests/integration/**/*.test.ts"],
    exclude: ["src/tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/lib/**", "src/app/api/**"],
      exclude: [
        "src/app/api/auth/**",
        "src/lib/prisma.ts",
        "node_modules/**",
      ],
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
