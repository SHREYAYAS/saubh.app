import type { Metadata, Viewport } from "next";
// Removed font imports for brevity, assuming you kept them.
import "./globals.css";

// Assuming you kept your font definitions (Geist, Geist_Mono)

export const metadata: Metadata = {
  title: 'SaubhApp Responsive PWA',
  description: 'A responsive homepage built with Next.js and Tailwind CSS, converted to PWA.',
  
  // --- PWA Metadata added here ---
  manifest: '/manifest.json',
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