import React from 'react';

const Controls = ({ isRunning, onStart, onPause, onReset }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {!isRunning ? (
                <button onClick={onStart} style={{ backgroundColor: 'var(--color-accent)', color: '#2d3436' }}>
                    Start
                </button>
            ) : (
                <button onClick={onPause} style={{ backgroundColor: '#fab1a0', color: '#2d3436' }}>
                    Pause
                </button>
            )}
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default Controls;
