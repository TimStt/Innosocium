import FeedbackForm from "@/widgets/main-blocks/feedback-form";
import Footer from "@/widgets/main-blocks/footer";
import { Header } from "@/widgets/main-blocks/header";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "../../styles/index.scss";
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";

// Font files can be colocated inside of `app`

// ===== INTER =====
export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },

    {
      path: "../../public/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },

    {
      path: "../../public/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },

    {
      path: "../../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-family",
  display: "swap",
});

export const displace20 = localFont({
  src: [
    {
      path: "../../public/fonts/Displace20-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Displace20-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Главная | Innosocium",
  description: "Innosocium - строим будущее России вместе",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/favicon.png",
  },

  // Предзагрузка критических ресурсов
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${displace20.variable} antialiased`}>
        <Header />
        <main className="wrapper">{children}</main>

        <Footer feedbackForm={<FeedbackForm />} />
      </body>
    </html>
  );
}
