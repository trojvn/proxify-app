import { Root } from "@/components/Root/Root";
import "@telegram-apps/telegram-ui/dist/styles.css";
import cn from "classnames";
import { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { ReactNode } from "react";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Proxify App",
  description: "Proxify App Description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(ubuntu.className)}>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
