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
      <body
        className={`min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-pink-50 text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}