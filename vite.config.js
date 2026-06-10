import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyHost = env.VITE_PROXY_HOST || 'release.wtjy.com'
  const port = Number(env.VITE_DEV_PORT) || 5173

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_BASE || './',
    server: {
      host: '0.0.0.0',
      port,
      strictPort: true,
      open: false,
      // 允许通过 release.wtjy.com 域名反向代理访问本地
      allowedHosts: [proxyHost, '.wtjy.com', 'localhost', '127.0.0.1'],
      // HTTPS 反代下 HMR WebSocket 走 wss:443
      hmr: {
        host: proxyHost,
        protocol: 'wss',
        clientPort: 443,
      },
    },
    preview: {
      host: '0.0.0.0',
      port,
      strictPort: true,
      allowedHosts: [proxyHost, '.wtjy.com', 'localhost', '127.0.0.1'],
    },
  }
})
