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
        

        {isConfirming ? (
          <>
            <p className="font-bold mt-10 text-xl translate-y-[-20px]">本当にリセットしますか？</p>
            <div className="flex justify-between mt-4 space-x-18">
              <button onClick={confirmReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">はい</button>
              <button onClick={() => setIsConfirming(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded min-w-[7rem]">いいえ</button>
            </div>
          </>
        ) : (
          <>
           <div className="text-lg space-y-4">
            <h1 className="text-2xl font-bold mb-4">ひめくりカウンターとは</h1>
            <p>ひめくりカレンダーのカウンター版です。毎日ひめくりするだけのアプリです。<br />
            カレンダーのように？メモを書き込むことができます。<br />
            その日にやりたいことなどを書いてみてください。<br />
            カウンターをめくるとメモは消えます。ひめくりカレンダーのように。。。</p>
            <h1 className="text-2xl font-bold mb-4">使い方</h1>
            

            <div>
              <h2 className="text-xl font-semibold">トップページ</h2>
              <p>タイトル：残り日数までにやり遂げたいことを記載してください。(1文字以上入力必須)</p>
              <p>残り日数：残り日数を入力してください。（1~999999まで入力可）</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">ひめくりページ</h2>
              <p>めくる：めくるを押すと次のページに遷移します。</p>
              <p>メモ入力：メモを入力できます。めくるとメモは削除されます。</p>
            </div>
            <p>リセット：初期化します。</p>
          </div>
            <div className="flex justify-between mt-4">
              {showResetButton && (
                <button onClick={handleResetClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded min-w-[10rem]">リセット</button>
              )}
              <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded min-w-[10rem]">閉じる</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;