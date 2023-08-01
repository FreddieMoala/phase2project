import React from 'react';

export default function Background ({ srmValue }) {
    const getTextColor = (backgroundColor) => {
        const isBlackBackground = backgroundColor.toLowerCase() === '#000000';
        if (isBlackBackground) {
          return '#ffffff';
        }
  };

  const getBackgroundColor = (srmValue) => {
    if (srmValue < 5) {
        return 'lightyellow';
      } else if (srmValue >= 5 && srmValue < 10) {
        return 'gold';
      } else if (srmValue >= 10 && srmValue < 15) {
        return 'amber';
      } else if (srmValue >= 15 && srmValue < 20) {
        return 'darkOrange';
      } else if (srmValue >= 20 && srmValue < 25) {
        return 'brown';
      } else if (srmValue >= 25 && srmValue < 30) {
        return 'darkBrown';
      } else {
        return 'black';
      }
    };

    const backgroundColor = getBackgroundColor(srmValue);
    const textColor = getTextColor(backgroundColor);

  return (
    <div style={{ backgroundColor, color: textColor }}>
    </div>
  );
};

  