'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import FlipSection from './components/FlipSection';

export default function Home() {

  const [days, setDays] = useState<number>(0);
  const [title, setTitle] = useState<any>("");
  const handleSetDays = (duration: number) => {
    setDays(duration);
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <FlipSection
        title={title}
        setTitle={setTitle} 
        days={days}
        onSetDays={handleSetDays} 
      />
    </main>
  )
}
