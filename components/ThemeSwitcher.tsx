"use client";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect runs on the cliet so it can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
    return (
      <Tabs defaultValue={theme}>
        <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
            <TabsTrigger value='light' onClick={(e) => setTheme("light")}>
              <SunIcon className="h-[1.2rem] w-[1.2rem] dark:text-gray-500 text-purple-600"></SunIcon>
            </TabsTrigger>
            <TabsTrigger value='dark' onClick={(e) => setTheme("dark")}>
              <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 text-gray-500 dark:text-white"></MoonIcon>
            </TabsTrigger>
        </TabsList>
      </Tabs> 
    ) 
      
}

export default ThemeSwitcher
