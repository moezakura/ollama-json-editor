import React from 'react';

const RainbowLoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:200%_100%] animate-rainbow-flow" />
  );
};

export default RainbowLoadingBar;
