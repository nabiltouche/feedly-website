import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Feedly - Digital Loyalty Platform',
  description: 'Transform passing customers into loyal ones with our digital loyalty cards.',
  openGraph: {
    type: 'website',
    url: 'https://feedly.example.com',
    title: 'Feedly - Digital Loyalty Platform',
    description: 'Transform passing customers into loyal ones with our digital loyalty cards.',
    images: [{ url: '/og-image.jpg' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feedly - Digital Loyalty',
    description: 'A new generation of customer loyalty.'
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Feedly",
              "url": "https://feedly.example.com",
              "sameAs": []
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
