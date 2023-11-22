`use client`

import { useState, useEffect } from 'react';

function FlipSection() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [localTitle, setLocalTitle] = useState('');
  const [localDays, setLocalDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTitle = localStorage.getItem('title');
    const savedDays = localStorage.getItem('days');

    if (savedTitle && savedDays) {
      setLocalTitle(savedTitle);
      setLocalDays(parseInt(savedDays, 10));
      setIsSetupComplete(true);
    }
    setIsLoading(false); // 読み込み完了
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('title', localTitle);
    localStorage.setItem('days', String(localDays));

    setIsSetupComplete(true);
  };

  const handleFlip = () => {
    const newDays = localDays - 1;
    setLocalDays(newDays);
    localStorage.setItem('days', String(newDays));
  };

  const handleReset = () => {
    // ローカルストレージからデータをクリア
    localStorage.removeItem('title');
    localStorage.removeItem('days');

    // 状態を初期値にリセット
    setIsSetupComplete(false);
    setLocalTitle('');
    setLocalDays(0);
  };

  if (isLoading) {
    return <p>読み込み中...</p>;
  }
   
  if (!isSetupComplete) {
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
      </div>
    )
  } else {
    
    return (
      <div>
        <p>残り {localDays} 日</p>
        <button onClick={handleFlip}>めくる</button>
        <button onClick={handleReset}>リセット</button>
      </div>
    );
  }
}

export default FlipSection;