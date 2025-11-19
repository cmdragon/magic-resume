import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  locale: string;
  bodyClassName?: string;
};

export default function Document({ children, locale, bodyClassName }: Props) {
  return (
    <html className={inter.className} lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2874982874195135"
          crossOrigin="anonymous"
        />
        <script
          src="//pl28089020.effectivegatecpm.com/26/db/bd/26dbbd836cc579a60dacafd883ed7349.js"
        />
      </head>
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
