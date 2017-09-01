import React from 'react';
import './Counter.css';

const Counter = ({lastTime, bestTime, wins}) => {
  return (
    <div>
      <span className="details"><strong>Last Time:</strong> {lastTime}</span>
      <span className="details"><strong>Best Time:</strong> {bestTime}</span>
      <span className="details"><strong>Wins:</strong> {wins}</span>
    </div>
  );
}

export default Counter;
