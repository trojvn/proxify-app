"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
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

  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }
  // const isDark = useSignal(miniApp.isDark);

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  useClientOnce(() => {
    initSdk(debug);
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    debug && import("eruda").then((lib) => lib.default.init());
  }, [debug]);

  return (
    <AppRoot
      // appearance={isDark ? "dark" : "light"}
      appearance={"light"}
      platform="base"
      // platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {/* <AppRoot appearance={"light"} platform="base"> */}
      {children}
    </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
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
