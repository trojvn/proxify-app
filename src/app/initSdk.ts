import { $debug, init, initData } from "@telegram-apps/sdk-react";

export function initSdk(debug: boolean) {
  $debug.set(debug);
  init();
  initData.restore();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);
}
