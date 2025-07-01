import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import Container from '@/components/Container'; // ✅ You missed this
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bio-Zapp',
  description: 'A link in bio tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body
        className={`${inter.className} text-gray-900 cursor-pointer select-none dark:text-white bg-zinc-300 dark:bg-zinc-900 min-h-screen overflow-y-scroll w-full scrollbar-hide relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <Navbar />
            <main className="w-full p-10 md:max-w-full md:min-h-screen h-full cursor-pointer relative z-10">
              {/* Blurred background circles */}
              <div className="absolute z-0 w-48 h-48 bg-blue-500 dark:bg-blue-700 opacity-30 rounded-full top-10 left-10 blur-3xl" />
              <div className="absolute z-0 w-48 h-48 bg-purple-500 dark:bg-purple-700 opacity-30 rounded-full bottom-10 right-10 blur-3xl" />

              {children}
            </main>
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
