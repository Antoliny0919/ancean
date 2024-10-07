import { useState, useCallback } from 'react';

export default function useModal(initialState = false) {
  const [state, setState] = useState(initialState);

  const open = useCallback((effect = () => {}) => {
    setState(true);
    effect();
  }, []);

  const close = useCallback((effect = () => {}) => {
    setState(false);
    effect();
  }, []);

  return { state, open, close };
}
