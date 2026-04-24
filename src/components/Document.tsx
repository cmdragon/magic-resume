import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import PromoBanner from "@/components/shared/PromoBanner";
import WechatPopup from "@/components/shared/WechatPopup";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  locale: string;
  bodyClassName?: string;
};

export default function Document({ children, locale, bodyClassName }: Props) {
  return (
    <html className={inter.className} lang={locale} suppressHydrationWarning>
      <body className={bodyClassName}>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2874982874195135"
          strategy="lazyOnload"
        />
        <PromoBanner />
        <WechatPopup />
        {children}
      </body>
    </html>
  );
}
