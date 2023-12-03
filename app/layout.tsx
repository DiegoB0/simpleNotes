import NavBar from '@/components/NavBar';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/ThemesProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Notes',
  description: 'Created by DiegoB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 

return (
<ClerkProvider appearance={{
        baseTheme: dark
      }}>
      <html lang="en" className={cn(inter.className, "dark")}
      style={{
        colorScheme: 'dark',
        }}>
        <body>
         <ThemeProvider>
           <div className ="flex min-h-screen w-full flex-col items-center dark:bg-neutral-900 ">
           <NavBar />
            <Separator />
           <main className="flex flex-grow w-full justify-center dark:bg-neutral-950 items-center bg-neutral-200">
            {children}
            <Toaster />
            </main>
           </div>
         </ThemeProvider>
          </body>
      </html>
      </ClerkProvider>
)
}
