// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// `cloudflare: false` evita o bundle só para Workers; em seguida o Nitro (import dinâmico)
// gera saída compatível com a Vercel. Para Cloudflare Pages, remova `cloudflare: false`.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      await import("nitro/vite").then((m) =>
        m.nitro({
          // Saída no formato que a Vercel reconhece (Build Output API)
          preset: process.env.VERCEL ? "vercel" : "node-server",
        }),
      ),
    ],
  },
});
