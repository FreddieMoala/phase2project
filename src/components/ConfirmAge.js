import React from 'react';
import {link, useNavigate } from 'react-router-dom';
import "./Styles.css";

export default function ConfirmAge() {
    const navigate = useNavigate();

    const handleYesClick = () => {
        navigate('/beer_gen');
    };

    const handleNoClick = () => {
        alert("You're too young");
    };

    return (
        <div className='confirm-age'>
            <h2>Are you above 18 years old?</h2>
            <button onClick={handleYesClick}>Yes</button>
            <button onClick={handleNoClick}>No</button>
            <p >
                If you are above 18 years old, Click "Yes" to contiune.
                Otherwise, click "No"
            </p>
        </div>
    );
};