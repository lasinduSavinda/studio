"use client";

import Link from 'next/link';
import { Moon } from 'lucide-react';

const Header = () => (
  <header className="flex items-center justify-between p-4 border-b bg-card">
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="p-2 rounded-full bg-primary/20">
          <Moon className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-headline text-foreground">Free Period Tracker Online</h1>
      </div>
    </Link>
  </header>
);

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Welcome to our Free Period Tracker! Our mission is to provide a simple, private, and effective way for individuals to track their menstrual cycles. We believe that understanding your body is a fundamental aspect of health and well-being.
            </p>
            <p>
              This application was created with privacy as a top priority. All the data you enter is stored exclusively in your browser's local storage. This means your cycle information, symptoms, and notes never leave your device. We do not have servers that collect or analyze your personal data. You are in complete control.
            </p>
            <p>
              Our tracker helps you:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Log your period start and end dates.</li>
              <li>View predictions for future periods, fertile windows, and ovulation days.</li>
              <li>Track daily symptoms and moods.</li>
              <li>Keep private notes for each day.</li>
              <li>Receive AI-powered suggestions based on your logged symptoms to better understand potential patterns.</li>
              <li>Export your data to PDF for your personal records or to share with a healthcare provider.</li>
            </ul>
            <p>
              We are committed to providing a reliable and user-friendly tool. Thank you for choosing our app to be a part of your health journey.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}