import { $debug, init, initData } from "@telegram-apps/sdk-react";

export function initSdk(debug: boolean) {
  $debug.set(debug);
  init();
  // miniApp.mount();
  // themeParams.mount();
  initData.restore();
  // void viewport.mount().catch((e) => {
  //   console.error("Something went wrong mounting the viewport", e);
  // });

  // viewport.bindCssVars();
  // miniApp.bindCssVars();
  // themeParams.bindCssVars();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);
}
