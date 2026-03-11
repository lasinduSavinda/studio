import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Period Tracker Online',
  description: 'Track your menstrual cycle, predict your period, ovulation and fertile window with our free online period tracker. Log symptoms and get insights.',
  keywords: 'period tracker, cycle tracking, ovulation calendar, fertility tracker, menstrual cycle, period calculator, free period tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9204801617185567"
     crossorigin="anonymous"></script>
        <meta name="msvalidate.01" content="F9A98516248814EDA69BD8C7967EB05F" />
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-45KR3E7V2J"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-45KR3E7V2J');
</script>
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased flex flex-col")} suppressHydrationWarning>
        <div className="flex-grow">
          {children}
        </div>
        <footer className="bg-card text-card-foreground border-t">
          <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Free Period Tracker Online. All Rights Reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-primary">About Us</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-primary">Contact Us</Link>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
            </nav>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
