import React, { useEffect } from 'react';

const TimerDisplay = ({ timeLeft }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    useEffect(() => {
        document.title = `(${formattedTime}) Pomodoro Timer`;

        return () => {
            document.title = 'Pomodoro Timer';
        };
    }, [formattedTime]);

    return (
        <div style={{ fontSize: '6rem', fontWeight: 'bold', margin: '2rem 0', fontFamily: 'monospace' }}>
            {formattedTime}
        </div>
    );
};

export default TimerDisplay;
