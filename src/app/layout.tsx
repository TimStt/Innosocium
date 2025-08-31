import FeedbackForm from '@/widgets/main-blocks/feedback-form'
import Footer from '@/widgets/main-blocks/footer'
import { Header } from '@/widgets/main-blocks/header'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '../../styles/index.scss'

// Font files can be colocated inside of `app`

// ===== INTER =====
export const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },

    {
      path: '../../public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },

    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },

    {
      path: '../../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-family',
  display: 'swap',
})

export const displace20 = localFont({
  src: [
    {
      path: '../../public/fonts/Displace20-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Displace20-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--second-family',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Главная | Innosocium',
  description: 'Innosocium - строим будущее России вместе',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.png',
  },

  // Предзагрузка критических ресурсов
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${displace20.variable} antialiased`}>
        <Header />
        <main className="wrapper">{children}</main>

        <svg style={{ display: 'none' }}>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.001 0.005"
              numOctaves="1"
              seed="17"
              result="turbulence"
            ></feTurbulence>
            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5"></feFuncR>
              <feFuncG type="gamma" amplitude="0" exponent="1" offset="0"></feFuncG>
              <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5"></feFuncB>
            </feComponentTransfer>

            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap"></feGaussianBlur>

            <feSpecularLighting
              in="softMap"
              surfaceScale="5"
              specularConstant="1"
              specularExponent="100"
              lightingColor="white"
              result="specLight"
            >
              <fePointLight x="-200" y="-200" z="300"></fePointLight>
            </feSpecularLighting>

            <feComposite
              in="specLight"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litImage"
            ></feComposite>

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            ></feDisplacementMap>
          </filter>
        </svg>
        <Footer feedbackForm={<FeedbackForm />} />
      </body>
    </html>
  )
}
