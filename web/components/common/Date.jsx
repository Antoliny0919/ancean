import { useState, useEffect } from 'react';

export default function CreateDate(requestDate) {
  const [date, setDate] = useState(null);

  useEffect(
    () => setDate(requestDate ? new Date(requestDate) : new Date()),
    [],
  );

  return date;
}
