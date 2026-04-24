import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import Document from "@/components/Document";
import { locales } from "@/i18n/config";
import { Providers } from "@/app/providers";

export const runtime = "edge";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });
  const baseUrl = "https://magic-resume.cmdragon.cn";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Magic Resume",
    description: t("description"),
    url: `${baseUrl}/${locale}`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1024",
    },
  };

  return {
    title: t("title") + " - " + t("subtitle"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        zh: `${baseUrl}/zh`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title") + " - " + t("subtitle"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Magic Resume",
      locale: locale,
      alternateLocale: locale === "en" ? ["zh"] : ["en"],
      type: "website",
      images: [
        {
          url: `${baseUrl}/web-shot.png`,
          width: 1200,
          height: 630,
          alt: "Magic Resume - AI Resume Builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title") + " - " + t("subtitle"),
      description: t("description"),
      images: [`${baseUrl}/web-shot.png`],
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  setRequestLocale(locale);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider>
    </Document>
  );
}
