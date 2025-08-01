import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'LunaCycle - Export',
  description: 'Your cycle history report.',
};

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "bg-white text-black")}>
        {children}
      </body>
    </html>
  );
}
