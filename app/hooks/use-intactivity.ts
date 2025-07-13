import { useCallback, useEffect, useRef } from 'react';

const useInactivity = (onInactivity: () => void, timeout = 60 * 1000) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onInactivity, timeout);
  }, [onInactivity, timeout]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer(); // Start timer on mount

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [timeout, onInactivity, resetTimer]);
};

export default useInactivity;
