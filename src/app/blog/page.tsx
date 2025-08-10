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
              <div className="space-y-4 text-base md:text-lg text-muted-foreground">
                <p>
                  The menstrual cycle is more than just your period. It's a complex and powerful process your body goes through each month, driven by fluctuating hormones. Understanding its different phases can empower you to take better care of your health, anticipate changes in your energy and mood, and recognize what's normal for you.
                </p>
                <p>
                  A full cycle is measured from the first day of one period to the first day of the next. While the average cycle is 28 days, it's perfectly normal for it to range anywhere from 21 to 35 days. Let's walk through the four main phases.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">1. The Menstrual Phase (Your Period)</h3>
                <p>
                  This is Day 1 of your cycle. It starts when an egg from the previous cycle wasn't fertilized. Because pregnancy hasn't occurred, levels of the hormones estrogen and progesterone drop. The thickened lining of your uterus, which was prepared to support a pregnancy, is no longer needed, so it sheds. This shedding is what causes the bleeding you experience during your period.
                </p>
                <p>
                  During this time, you might experience symptoms like cramps, bloating, headaches, and fatigue. This phase typically lasts 3 to 7 days.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">2. The Follicular Phase</h3>
                <p>
                  This phase starts on the first day of your period (so it overlaps with the menstrual phase) and ends when you ovulate. Your pituitary gland releases Follicle Stimulating Hormone (FSH), which stimulates your ovaries to produce several small sacs called follicles. Each follicle contains an immature egg.
                </p>
                <p>
                  Eventually, one follicle becomes dominant and continues to mature. The other follicles are reabsorbed by the body. The maturing follicle causes a rise in estrogen, which thickens the lining of your uterus again, creating a nutrient-rich environment for an embryo to grow.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">3. The Ovulation Phase</h3>
                <p>
                  The rise in estrogen from the follicular phase triggers your pituitary gland to release Luteinizing Hormone (LH). This is what starts the process of ovulation.
                </p>
                <p>
                  Ovulation is when your ovary releases a mature egg. The egg travels down the fallopian tube toward the uterus to be fertilized by sperm. This is the only time during your cycle you can get pregnant. The egg survives for about 12 to 24 hours. Ovulation usually happens around day 14 in a 28-day cycle, but the exact day can vary.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">4. The Luteal Phase</h3>
                <p>
                  After the follicle releases its egg, it changes into what is called the corpus luteum. This structure releases hormones, particularly progesterone and some estrogen. These hormones keep your uterine lining thick and ready for a fertilized egg to implant.
                </p>
                <p>
                  If you do get pregnant, your body will produce human chorionic gonadotropin (hCG), which helps maintain the corpus luteum and keeps the uterine lining thick. If you don't get pregnant, the corpus luteum will shrink and be reabsorbed. This leads to decreased levels of estrogen and progesterone, which causes your period to start, and the cycle begins all over again. This phase is when many people experience PMS symptoms like mood swings, bloating, and acne.
                </p>
              </div>
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
