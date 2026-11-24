import { defineConfig, devices } from '@playwright/test';

const PUERTO = 8790;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PUERTO}`, trace: 'off' },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'] } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
  // Construye la web y la sirve con el mismo motor que Cloudflare (workerd).
  webServer: {
    command: `npm run build && npx wrangler dev --port ${PUERTO}`,
    url: `http://localhost:${PUERTO}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
