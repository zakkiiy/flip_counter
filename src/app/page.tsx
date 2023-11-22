'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from './components/Header';
// import FlipSection from './components/FlipSection';

export default function FlipSection() {
  const [localTitle, setLocalTitle] = useState('');
  const [localDays, setLocalDays] = useState(0);
  // 画面の切り替えを管理
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  // 画面のロード
  const [isLoading, setIsLoading] = useState(true);

  // 初回起動時にローカルストレージから値を取得する
  useEffect(() => {
    const savedTitle = localStorage.getItem('title');
    const savedDays = localStorage.getItem('days');

    if (savedTitle && savedDays) {
      setLocalTitle(savedTitle);
      setLocalDays(parseInt(savedDays, 10));
      setIsSetupComplete(true);
    }
    setIsLoading(false);
  }, []);
  
  // 初回入力時にOKボタンを押下した際の処理
  const handleSubmit = () => {
    localStorage.setItem('title', localTitle);
    localStorage.setItem('days', String(localDays));

    setIsSetupComplete(true);
  };

  // 日めくり機能
  const handleFlip = () => {
    const newDays = localDays - 1;
    setLocalDays(newDays);
    localStorage.setItem('days', String(newDays));
  };

  // リセット機能
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
