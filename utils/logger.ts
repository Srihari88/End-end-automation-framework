export const logger = {
  info: (msg: string) => {
    const t = new Date().toISOString();
    console.log(`${t} [INFO] ${msg}`);
  },
  debug: (msg: string) => {
    const t = new Date().toISOString();
    console.debug(`${t} [DEBUG] ${msg}`);
  },
  warn: (msg: string) => {
    const t = new Date().toISOString();
    console.warn(`${t} [WARN] ${msg}`);
  },
  error: (msg: string) => {
    const t = new Date().toISOString();
    console.error(`${t} [ERROR] ${msg}`);
  },
};
