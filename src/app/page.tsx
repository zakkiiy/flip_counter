'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import './styles.scss';
// import FlipSection from './components/FlipSection';

export default function FlipSection() {
  const [localTitle, setLocalTitle] = useState('');
  const [localDays, setLocalDays] = useState(0);
  const [localMemo, setLocalMemo] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false); // 画面の切り替えを管理
  const [isLoading, setIsLoading] = useState(true); // 画面のロード
  const [isFlipping, setIsFlipping] = useState(false); // めくり

  // 初回起動時にローカルストレージから値を取得する
  useEffect(() => {
    const savedTitle = localStorage.getItem('title');
    const savedDays = localStorage.getItem('days');
    const savedMemo = localStorage.getItem('memo');

    if (savedTitle && savedDays) {
      setLocalTitle(savedTitle);
      setLocalDays(parseInt(savedDays, 10));
      setIsSetupComplete(true);
    }
    if (savedMemo) {
      setLocalMemo(savedMemo);
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
    setIsFlipping(true); // アニメーション開始
  };

  const onFlipAnimationEnd = () => {
    if (isFlipping) {
      // 日数のデクリメントなど、めくる操作後の処理
      const newDays = localDays - 1;
      setLocalDays(newDays);
      localStorage.setItem('days', String(newDays));
      setLocalMemo('');
      localStorage.removeItem('memo');
      setIsFlipping(false); // アニメーション終了
    }
  };

  // リセット機能
  const handleReset = () => {
    // ローカルストレージからデータをクリア
    localStorage.removeItem('title');
    localStorage.removeItem('days');

    // 状態を初期値にリセット
    setLocalMemo('');
    setIsSetupComplete(false);
    setLocalTitle('');
    setLocalDays(0);
  };

  const handleMemoChange = (e: any) => {
    const newMemo = e.target.value;
    setLocalMemo(newMemo);
    localStorage.setItem('memo', newMemo);
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
          type="number"
          value={localDays}
          onChange={(e: any) => setLocalDays(e.target.value)} 
        />
        <button onClick={handleSubmit}>OK</button>
      </div>
    )
  } else {
    return (
      
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div id="box" className={isFlipping ? 'flipping' : ''} onAnimationEnd={onFlipAnimationEnd}>
        
        <p className="text-center">タイトル: {localTitle}</p>
        <p className="text-center">残り {localDays} 日</p>
          <input
            className="mt-4"
            value={localMemo}
            onChange={handleMemoChange}
          />
        </div>
        <div className="mt-4">
          <button className="mx-2" onClick={handleFlip}>めくる</button>
          <button className="mx-2" onClick={handleReset}>リセット</button>
        </div>
      </div>
    );
  }
}
