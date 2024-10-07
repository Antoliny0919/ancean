import { useRef, useEffect } from 'react';

export default function useInterval(callback, delay) {
  const newCallback = useRef();

  useEffect(() => {
    newCallback.current = callback;
  });

  useEffect(() => {
    const run = () => {
      newCallback.current();
    };

    const executer = setInterval(run, delay);
    return () => clearInterval(executer);
  }, [delay]);
}
