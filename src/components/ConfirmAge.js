// ConfirmAge.js

import React, { useState } from 'react';

export default function ConfirmAge({ onConfirm }) {
    const [age, setAge] = useState('');

    const handleSubmit = () => {
        if (parseInt(age) >= 18) { // Assuming 21 is the legal drinking age.
            onConfirm(true);
        } else {
            onConfirm(false);
        }
    };

    return (
        <div>
            <h2>Please confirm your age</h2>
            <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={e => setAge(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
