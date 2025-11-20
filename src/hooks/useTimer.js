import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialDurationMinutes) => {
    const [timeLeft, setTimeLeft] = useState(initialDurationMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        setTimeLeft(initialDurationMinutes * 60);
        setIsRunning(false);
        setIsFinished(false);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [initialDurationMinutes]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setIsFinished(true);
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, timeLeft]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setIsFinished(false);
        setTimeLeft(initialDurationMinutes * 60);
    };

    return { timeLeft, isRunning, isFinished, start, pause, reset };
};
