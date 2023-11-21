`use client`

import { useState, useEffect } from 'react';
interface FlipSectionProps {
  title: string;
  setTitle: any;
  days: number;
  setDays: any;
}

function FlipSection({ title, setTitle, days, setDays }: FlipSectionProps) {
  
  // daysプロパティで値を受け取る 
  const [localTitle, setLocalTitle] = useState(title);
  const [localDays, setLocalDays] = useState(days);

  const handleSubmit = () => {
    setTitle(localTitle);
    setDays(localDays); 
  };

  return (
    <div>
      <input 
      value={localTitle}
      onChange={(e) => setLocalTitle(e.target.value)}
      />
      <input 
        value={localDays}
        onChange={(e: any) => setLocalDays(e.target.value)} 
      />

      <button onClick={handleSubmit}>OK</button>

      // ひめくりカレンダー
    </div>
  )
}

export default FlipSection;