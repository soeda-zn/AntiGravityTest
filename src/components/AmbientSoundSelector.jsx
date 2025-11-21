import React from 'react';

const sounds = [
    { id: 'none', name: 'None', url: '' },
    { id: 'rain', name: 'Rain', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
    { id: 'forest', name: 'Forest', url: 'https://actions.google.com/sounds/v1/nature/forest_morning.ogg' },
    { id: 'waves', name: 'Waves', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
];

const AmbientSoundSelector = ({ currentSound, onSelect }) => {
    return (
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor="sound-select" style={{ marginRight: '0.5rem' }}>Ambient Sound:</label>
            <select
                id="sound-select"
                value={currentSound}
                onChange={(e) => onSelect(e.target.value)}
                style={{ padding: '0.5rem', fontSize: '1rem' }}
            >
                {sounds.map((sound) => (
                    <option key={sound.id} value={sound.id}>
                        {sound.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { sounds };
export default AmbientSoundSelector;
