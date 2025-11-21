import { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import DurationSelector from './components/DurationSelector';
import Controls from './components/Controls';
import AmbientSoundSelector, { sounds } from './components/AmbientSoundSelector';
import { useTimer } from './hooks/useTimer';
// import alarmSound from './assets/alarm.mp3'; // Placeholder

function App() {
    const [selectedDuration, setSelectedDuration] = useState(25);
    const [selectedSound, setSelectedSound] = useState('none');
    const { timeLeft, isRunning, isFinished, start, pause, reset } = useTimer(selectedDuration);
    const audioRef = useRef(new Audio());

    // Ambient Sound Effect
    useEffect(() => {
        const audio = audioRef.current;
        const sound = sounds.find(s => s.id === selectedSound);

        if (sound && sound.url) {
            if (audio.src !== sound.url) {
                audio.src = sound.url;
                audio.loop = true;
            }

            if (isRunning) {
                audio.play().catch(e => console.error("Ambient sound play failed", e));
            } else {
                audio.pause();
            }
        } else {
            audio.pause();
            audio.src = '';
        }

        return () => {
            audio.pause();
        };
    }, [isRunning, selectedSound]);

    // Voice Announcements
    useEffect(() => {
        if (isRunning) {
            const speak = (text) => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ja-JP';
                window.speechSynthesis.speak(utterance);
            };

            if (timeLeft === 900) { // 15 minutes
                speak("残り15分です");
            } else if (timeLeft === 600) { // 10 minutes
                speak("残り10分です");
            } else if (timeLeft === 300) { // 5 minutes
                speak("残り5分です");
            } else if (timeLeft === 180) { // 3 minutes
                speak("残り3分です");
            } else if (timeLeft === 60) { // 1 minute
                speak("残り1分です");
            }
        }
    }, [timeLeft, isRunning]);

    useEffect(() => {
        if (isFinished) {
            // Play sound
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.error("Audio play failed", e));

            // Send notification
            if (Notification.permission === 'granted') {
                new Notification("Pomodoro Timer", {
                    body: "Time's up! Take a break.",
                    icon: "/vite.svg" // Optional: use app icon
                });
            } else if (Notification.permission !== 'denied') {
                // Fallback if permission wasn't asked/granted yet, though we try to ask on start
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification("Pomodoro Timer", {
                            body: "Time's up! Take a break."
                        });
                    }
                });
            }
        }
    }, [isFinished]);

    const handleStart = () => {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
        start();
    };

    const handleDurationSelect = (duration) => {
        setSelectedDuration(duration);
        // The hook handles resetting the time when duration changes
    };

    return (
        <div className="container">
            <h1>Pomodoro Timer</h1>
            <DurationSelector onSelect={handleDurationSelect} currentDuration={selectedDuration} />
            <TimerDisplay timeLeft={timeLeft} />
            <Controls isRunning={isRunning} onStart={handleStart} onPause={pause} onReset={reset} />
            <AmbientSoundSelector currentSound={selectedSound} onSelect={setSelectedSound} />
        </div>
    );
}

export default App;
