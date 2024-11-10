'use client';

import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './Watch.css';

export default function Watch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={
        {
          // display: 'flex',
          // justifyContent: 'end',
          // alignItems: 'center',
        }
      }>
      <Clock value={time} renderNumbers={false} />
    </div>
  );
}
