import React from "react";

export default function ResetData({ onReset }) {
    const handleResetonClick = async () => {
        try {
            const response = await fetch('http://localhost:3001/favorites', {
                method: 'DELETE',
            });

            if (response.ok) {
                onReset();
            } else {
                console.error('Error resetting favorites data.');
            }
        }catch (error) {
            console.error('Error resetting favorites data:', error);
        }
    };
    return(
        <button onClick={handleResetonClick}>Reset Favorites</button>
    );
}