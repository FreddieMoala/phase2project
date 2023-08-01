import React from 'react';
import './Styles.css';

const Button = ({ refetchData }) => {

  const handleButtonClick = async () => {
   await refetchData();
  };

  return (
    <div className='box-button'>
      <button onClick={handleButtonClick} className='beer-button'>
        Get Another Beer
      </button>
    </div>
  );
};

export default Button;
