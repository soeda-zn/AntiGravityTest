import { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import DurationSelector from './components/DurationSelector';
import Controls from './components/Controls';
import { useTimer } from './hooks/useTimer';
// import alarmSound from './assets/alarm.mp3'; // Placeholder

function App() {
    const [selectedDuration, setSelectedDuration] = useState(25);
    const { timeLeft, isRunning, isFinished, start, pause, reset } = useTimer(selectedDuration);

    useEffect(() => {
        if (isFinished) {
            // Play sound
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); // Use a remote URL for now to ensure it works without local assets
            audio.play().catch(e => console.error("Audio play failed", e));
            alert("Time's up!");
        }
    }, [isFinished]);

    const handleDurationSelect = (duration) => {
        setSelectedDuration(duration);
        // The hook handles resetting the time when duration changes
    };

    return (
        <div className="container">
            <h1>Pomodoro Timer</h1>
            <DurationSelector onSelect={handleDurationSelect} currentDuration={selectedDuration} />
            <TimerDisplay timeLeft={timeLeft} />
            <Controls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />
        </div>
    );
}

export default App;
