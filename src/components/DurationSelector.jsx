import React from 'react';

const DurationSelector = ({ onSelect, currentDuration }) => {
    const durations = [25, 30, 40, 50, 60];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {durations.map((duration) => (
                <button
                    key={duration}
                    onClick={() => onSelect(duration)}
                    style={{
                        backgroundColor: currentDuration === duration ? 'var(--color-primary)' : '#1a1a1a',
                        borderColor: currentDuration === duration ? 'var(--color-primary)' : 'transparent',
                    }}
                >
                    {duration}m
                </button>
            ))}
        </div>
    );
};

export default DurationSelector;
