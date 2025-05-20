import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { SidebarNav } from '@/components/sidebar-nav'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BhojanBuddy - Your Health Food Tracker',
  description: 'Track your diet with food image analysis and get personalized health suggestions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 flex">
              <aside className="w-64 border-r border-border hidden md:block">
                <SidebarNav />
              </aside>
              <div className="flex-1">
                {children}
              </div>
            </div>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}