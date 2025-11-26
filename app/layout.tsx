import type { Metadata, Viewport } from "next";
// Removed font imports for brevity, assuming you kept them.
import "./globals.css";

// Assuming you kept your font definitions (Geist, Geist_Mono)

export const metadata: Metadata = {
  title: 'SaubhApp Responsive PWA',
  description: 'A responsive homepage built with Next.js and Tailwind CSS, converted to PWA.',
  
  // --- PWA Metadata added here ---
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SaubhApp',
  },
  // Open Graph metadata for link previews
  openGraph: {
    title: 'SaubhApp - Unlock Your Productivity Potential',
    description: 'A seamless, offline-ready web application designed for speed, reliability, and delight on any device.',
    url: 'https://saubh-app.vercel.app',
    siteName: 'SaubhApp',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SaubhApp Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'SaubhApp - Unlock Your Productivity Potential',
    description: 'A seamless, offline-ready web application designed for speed, reliability, and delight on any device.',
    images: ['/og-image.jpg'],
  },
  // -------------------------------
};

// Next.js 16 requires themeColor to be specified via the viewport export
// rather than within metadata.
export const viewport: Viewport = {
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('saubh-theme') || 'system';
                  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const themes = {
                    light: ['bg-gradient-to-br', 'from-indigo-50', 'via-purple-50', 'to-pink-50', 'text-gray-900'],
                    dark: ['bg-gradient-to-br', 'from-slate-900', 'via-indigo-950', 'to-purple-900', 'text-white']
                  };
                  const actualTheme = theme === 'system' ? getSystemTheme() : theme;
                  document.documentElement.classList.toggle('dark', actualTheme === 'dark');
                  if (themes[actualTheme]) {
                    document.body.classList.add(...themes[actualTheme]);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}