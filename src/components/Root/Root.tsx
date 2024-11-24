"use client";

import { miniApp, useLaunchParams, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { type PropsWithChildren, useEffect } from "react";

import { initSdk } from "@/app/initSdk";
import { useClientOnce } from "@/hooks/useClientOnce";
import { useDidMount } from "@/hooks/useDidMount";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { ErrorBoundary } from "../ErrorBoundary";
import { ErrorPage } from "../ErrorPage";

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  // Initialize the library.
  useClientOnce(() => {
    initSdk(debug);
  });

  const isDark = useSignal(miniApp.isDark);
  //   const initDataUser = useSignal(initData.user);

  // Set the user locale.
  //   useEffect(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //     initDataUser && setLocale(initDataUser.languageCode);
  //   }, [initDataUser]);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    debug && import("eruda").then((lib) => lib.default.init());
  }, [debug]);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform="base"
      // platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {children}
    </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLocale(_languageCode: string | undefined) {
  throw new Error("Function not implemented.");
}
