import { Root } from "@/components/Root/Root";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Proxify App",
  description: "Proxify App Description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
