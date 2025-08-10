"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Menu, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { blogPosts, BlogPost } from '@/lib/blog-data';

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <article>
            <header className="mb-8">
                <Button variant="link" asChild className="px-0 mb-4 text-muted-foreground">
                    <Link href="/blog">← Back to Blog</Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
                <p className="text-sm text-muted-foreground">Published on: {post.publishDate}</p>
            </header>
            
            {post.content}
            
          </article>
        </div>
      </main>
    </div>
  );
}
