import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://flip-counter-zeta.vercel.app/'), //本番環境のアプリ名
  title: 'ひめくりカウンター',
  description: '毎日ひめくりするだけのアプリ',
  openGraph: {
		title: 'ひめくりカウンター',
		description: '毎日ひめくりするだけのアプリ',
	},
	twitter: {
		title: 'ひめくりカウンター',
		description: '毎日ひめくりするだけのアプリ',
		card: 'summary_large_image',
	},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics /> 
      </body>
    </html>
  )
}
