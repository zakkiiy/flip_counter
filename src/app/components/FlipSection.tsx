`use client`

import { useState, useEffect } from 'react';
interface FlipSectionProps {
  title: string;
  setTitle: any;
  days: number;
  onSetDays: (duration: number) => void; 
}

function FlipSection({ title, setTitle, days, onSetDays }: FlipSectionProps) {
  
  // daysプロパティで値を受け取る 
  const [localTitle, setLocalTitle] = useState(title);
  const [duration, setDuration] = useState(days);

  return (
    <div>
      <input 
      value={localTitle}
      onChange={(e) => setLocalTitle(e.target.value)}
      />
      <input 
        value={duration}
        onChange={(e: any) => setDuration(e.target.value)} 
      />

    <button onClick={() => onSetDays(duration)}>
      Start 
    </button>

      // ひめくりカレンダー
    </div>
  )
}

export default FlipSection;