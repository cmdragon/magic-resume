import { ReactNode } from "react";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export const runtime = 'edge';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t("home.changelog") + " - " + t("common.title"),
  };
}

export default async function ChangelogLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8f9fb] to-white dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow py-16">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
