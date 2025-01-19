import ZephyrApp from "zephyrjs";

async function bootstrap(): Promise<void> {
  const app = new ZephyrApp();
  await app.init();
}

bootstrap();
