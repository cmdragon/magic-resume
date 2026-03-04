import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";
import "./font.css";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://magic-resume.cmdragon.cn"),
  description:
    "Create professional resumes with AI-powered tools. Build, customize, and export your resume in minutes with Magic Resume.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Props) {
  return children;
}
