import React from 'react';

const sounds = [
    { id: 'none', name: 'None', icon: '🔇', url: '' },
    { id: 'rain', name: 'Rain', icon: '🌧️', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
    { id: 'forest', name: 'Forest', icon: '🌲', url: 'https://actions.google.com/sounds/v1/nature/forest_morning.ogg' },
    { id: 'waves', name: 'Waves', icon: '🌊', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
];

const AmbientSoundSelector = ({ currentSound, onSelect }) => {
    return (
        <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {sounds.map((sound) => (
                <button
                    key={sound.id}
                    onClick={() => onSelect(sound.id)}
                    title={sound.name}
                    style={{
                        background: currentSound === sound.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        transform: currentSound === sound.id ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: currentSound === sound.id ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
                    }}
                >
                    {sound.icon}
                </button>
            ))}
        </div>
    );
};

export { sounds };
export default AmbientSoundSelector;
