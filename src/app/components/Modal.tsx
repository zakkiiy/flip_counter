'use client';

import { useState, useEffect } from 'react';

function Modal({ show, onClose, showResetButton, onReset } :any ) {
  // 確認ステップの状態を管理
  const [isConfirming, setIsConfirming] = useState(false);

  const handleResetClick = () => {
    setIsConfirming(true);
  };

  const confirmReset = () => {
    onReset();
    setIsConfirming(false); // 確認ステップを終了
    onClose(); // モーダルを閉じる
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">使い方</h1>

        {isConfirming ? (
          <>
            <p>本当にリセットしますか？</p>
            <button onClick={confirmReset} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">はい</button>
            <button onClick={() => setIsConfirming(false)} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">いいえ</button>
          </>
        ) : (
          <>
            <h2>トップページについて</h2>
            <p>タイトル：残り日数までにやり遂げたいことを記載してください(1文字以上入力必須)</p>
            <p>残り日数：残り日数を入力してください（1~999999まで入力可）</p>
            

            {showResetButton && (
              <button onClick={handleResetClick} className="className=mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">リセット</button>
            )}
            <button onClick={onClose} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">閉じる</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;