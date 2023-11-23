'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './styles.scss';
import Modal from './components/Modal';
import TwitterShareButton from './components/TwitterShareButton';
// import FlipSection from './components/FlipSection';

export default function FlipSection() {
  const [localTitle, setLocalTitle] = useState('');
  const [localDays, setLocalDays] = useState(1);
  const [localMemo, setLocalMemo] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false); // 画面の切り替えを管理
  const [isLoading, setIsLoading] = useState(true); // 画面のロード
  const [isFlipping, setIsFlipping] = useState(false); // めくり
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const MAX_LENGTH = 1000;

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
    // タイトルが1文字以上であることを確認
    if (localTitle.length < 1 || localTitle.length > 31) {
      alert("タイトルは1文字以上30文字以内で入力してください。");
      return; // これ以上処理を進めない
    }

    if (localDays < 1 || localDays > 1000000) {
      alert("残り日数は1以上999999以下の数値を入力してください。");
      return; // 処理を中断
    }


    const validatedDays = Math.min(Math.max(0, localDays), 999999);

    localStorage.setItem('title', localTitle);
    localStorage.setItem('days', String(validatedDays));

    setIsSetupComplete(true);
  };

  
  // モーダル
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDaysChange = (event: any) => {
    const value = event.target.value;
  
    if (value === '') {
      setLocalDays(value); // 入力フィールドが空の場合は、空文字列をセットする
    } else {
      const newValue = Number(value); // 入力値を数値に変換
  
      if (newValue >= 0 && newValue <= 999999) {
        setLocalDays(newValue);
      } else if (newValue > 999999) {
        setLocalDays(999999);
      } else if (newValue < 0) {
        setLocalDays(0);
      }
    }
  };
  

  // 日めくり機能
  const handleFlip = () => {
    setIsFlipping(true); // アニメーション開始
  };

  const onFlipAnimationEnd = () => {
    if (isFlipping) {
      // 日数のデクリメントなど、めくる操作後の処理
      if (localDays > 0) {
        const newDays = localDays - 1;
        setLocalDays(newDays);
        localStorage.setItem('days', String(newDays));
        setLocalMemo('');
        localStorage.removeItem('memo');
        // 日数が0になった場合、紙吹雪の表示などの特別なアクションを実行
        if (newDays === 0) {
          setShowConfetti(true);
          // ここで紙吹雪を表示するなどの処理
        }
      }
        setIsFlipping(false); // アニメーション終了
      
    }
  };

  // リセット機能
  const handleReset = () => {
    // ローカルストレージからデータをクリア
    localStorage.removeItem('title');
    localStorage.removeItem('days');
    localStorage.removeItem('memo');

    // 状態を初期値にリセット
    setLocalMemo('');
    setIsSetupComplete(false);
    setLocalTitle('');
    setLocalDays(1);
    setShowConfetti(false);
  };

  const handleMemoChange = (e: any) => {
    let newMemo = e.target.value;
    // 新しいメモが最大長を超えている場合、最大長に切り詰める
    if (newMemo.length > MAX_LENGTH) {
      newMemo = newMemo.substring(0, MAX_LENGTH);
    }
    setLocalMemo(newMemo);
    localStorage.setItem('memo', newMemo);
  };

  if (isLoading) {
    return (
    <div className="flex justify-center items-center h-screen font-black text-6xl">
      読み込み中...
    </div>
    )
  }
   
  if (!isSetupComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-black text-center mb-20 dark:text-gray-800">ひめくりカウンター</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex flex-col mb-2">
            <div className="flex justify-start items-center mb-1 dark:text-gray-800">
              <label className="text-lg font-light">タイトル</label>
              <span className="text-red-500 text-base ml-2">*</span>
            </div>
            <input 
              className="block w-full px-4 py-2 mb-2 text-lg rounded border border-gray-300 dark:text-gray-800"
              placeholder="タイトルを入力"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex justify-start items-center mb-1">
            <label className="text-lg font-light dark:text-gray-800">残り日数を入力</label>
              <span className="text-red-500 text-base ml-2">*</span>
            </div>
            <input
              className="block w-full px-4 py-2 mb-4 text-lg rounded border border-gray-300 dark:text-gray-800"
              type="number"
              name="number"
              min="0"
              max="999999"
              value={localDays}
              onChange={handleDaysChange}
              placeholder="残り日数を入力"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 min-w-[7rem]"
            onClick={handleSubmit}>
            次へ
          </button>
          <div>
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 min-w-[7rem]"
              onClick={() => setShowModal(true)}>使い方</button>
            <Modal
              show={showModal}
              onClose={handleModalClose}
              showResetButton={false}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex flex-col justify-start items-center h-screen w-full dark:text-gray-800">
          <div className="text-center text-5xl font-black mt-16">
            {localTitle}
          </div>
          <div id="box" className={`${isFlipping ? 'flipping' : ''} mt-6`}onAnimationEnd={onFlipAnimationEnd}>
            <div className="text-center text-6xl mt-14 font-black">
              残り {localDays} 日
            </div>
            <div className="absolute inset-0 flex justify-center mt-28 dark:text-gray-800">
              <textarea
                className="w-8/12 h-60 mt-16 resize-none"
                value={localMemo}
                onChange={handleMemoChange}
                placeholder="メモを入力することができます。めくると内容が消えます。"
              />
            </div>
          </div>
          <div className="mt-10 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded shadow-lg hover:bg-indigo-600 min-w-[10rem]"
              onClick={handleFlip}>
                めくる
            </button>
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 min-w-[10rem]"
              onClick={() => setShowModal(true)}>
                使い方
            </button>
            <div className="dark:text-blue-200">
              <TwitterShareButton 
                localTitle={localTitle}
                localDays={localDays}
              />
            </div>
          </div>
          <Modal
              show={showModal}
              onClose={handleModalClose}
              showResetButton={true}
              onReset={handleReset}
            />
          {showConfetti && <Confetti />}
        </div>
      </div>
    );
  }
}
