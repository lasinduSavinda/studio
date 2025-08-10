"use client";

import Link from 'next/link';
import { Menu, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => (
    <header className="flex items-center justify-between p-4 border-b bg-card">
        <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
                <div className="p-2 rounded-full bg-primary/20">
                    <Moon className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground">Free Period Tracker Online</h1>
            </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
            </Button>
        </nav>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="flex flex-col gap-4 mt-8">
                         <Button variant="ghost" asChild>
                            <Link href="/">Home</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/about">About</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/privacy">Privacy</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
);

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-base md:text-lg text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">1. Your Privacy is Our Priority</h2>
              <p>
                This Privacy Policy explains how our Free Period Tracker application handles your data. Our core principle is simple: your data is yours, and it should stay with you. We have designed this application to be completely private and secure by storing all information directly on your own device.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">2. Data Storage</h2>
              <p>
                All data you enter into the application—including cycle dates, symptom logs, notes, and any other personal information—is stored exclusively in your web browser's local storage. This data is not transmitted to, stored on, or processed by any external servers. It never leaves your computer or mobile device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">3. Data Collection</h2>
              <p>
                We do not collect, track, or share any of your personal data. There are no analytics scripts, tracking pixels, or third-party services that have access to the information you provide. The application operates entirely offline in terms of data storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">4. AI Feature and Data Usage</h2>
              <p>
                The "Save & Analyze Symptoms" feature uses an AI model to provide suggestions based on the symptoms you input for a specific day. When you use this feature, the symptom data for that single entry (mood, cramps, etc.) is sent to a third-party AI service (such as Google's Gemini) to generate suggestions. This data is sent anonymously and is not linked to your identity or past entries. We do not store this information on any server after the analysis is complete. The generated suggestion is returned to you and saved only in your browser's local storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">5. Data Deletion</h2>
              <p>
                You have full control over your data. You can clear all your data at any time by using the "Delete All Data" button in the application. This action is irreversible and will permanently remove all stored information from your browser. Because we don't store your data, we cannot recover it for you.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page. As we do not collect your contact information, we encourage you to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
