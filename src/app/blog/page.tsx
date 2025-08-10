"use client";

import Link from 'next/link';
import { Menu, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';


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
            <Button variant="ghost" asChild>
                <Link href="/blog">Blog</Link>
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
                        <Button variant="ghost" asChild>
                            <Link href="/blog">Blog</Link>
                        </Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
);

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
          <div className="space-y-8">
            <article className="pb-8 border-b">
              <h2 className="text-2xl font-semibold mb-2">Understanding Your Menstrual Cycle</h2>
              <p className="text-sm text-muted-foreground mb-4">Published on: August 1, 2024</p>
              <p className="text-base md:text-lg text-muted-foreground">
                The menstrual cycle is more than just your period. It's a complex process that involves fluctuating hormones and changes in your body. Understanding the different phases can empower you to take better care of your health...
              </p>
              <Button variant="link" asChild className="px-0">
                <Link href="#">Read More</Link>
              </Button>
            </article>
            <article className="pb-8 border-b">
              <h2 className="text-2xl font-semibold mb-2">Tips for Managing PMS Symptoms</h2>
              <p className="text-sm text-muted-foreground mb-4">Published on: July 25, 2024</p>
              <p className="text-base md:text-lg text-muted-foreground">
                Premenstrual Syndrome (PMS) can bring a range of physical and emotional symptoms. From diet changes to gentle exercise, there are many ways to find relief. Here are some tips to help you manage...
              </p>
               <Button variant="link" asChild className="px-0">
                <Link href="#">Read More</Link>
              </Button>
            </article>
             <article>
              <h2 className="text-2xl font-semibold mb-2">The Importance of Tracking Your Cycle</h2>
              <p className="text-sm text-muted-foreground mb-4">Published on: July 18, 2024</p>
              <p className="text-base md:text-lg text-muted-foreground">
                Tracking your menstrual cycle is a powerful tool for self-awareness. It can help you identify patterns, predict your period, and even detect potential health issues early on. Learn why it's a habit worth starting...
              </p>
               <Button variant="link" asChild className="px-0">
                <Link href="#">Read More</Link>
              </Button>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
