import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';

const TwitterShareButton = ({ localTitle, localDays }: any) => {
  const tweetText = `${localTitle} - 残り${localDays}日 | ひめくりカウンター\n`;
  const pageUrl ="https://flip-counter-zeta.vercel.app/";

  return (
    <button className="icon"
      onClick={() => {
        window.open(
          `https://twitter.com/share?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(tweetText)}`,
          '_blank'
        );
      }}
    >
      <TwitterIcon />
    </button>
  );
};

export default TwitterShareButton;