import React from 'react';
import './Header.css';

const Header = (
  {
    sizeX,
    sizeY,
    maxBombNumber,
    bombNumber,
    onBombNumberChange,
    onSizeXChange,
    onSizeYChange
  }) => {

  const sizeOptionValues = () => {
    let options = [];
    
    for (var i = 0; i < 10; i++) {
      options.push(<option key={i+ 1} value={i + 1}>{i + 1}</option>);
    }

    return options;
  }

  const bombNumberChange = (selected) => {
    onBombNumberChange(parseInt(selected), 10);
  }

  const sizeXChange = (selected) => {
    onSizeXChange(parseInt(selected), 10);
  }

  const sizeYChange = (selected) => {
    onSizeYChange(parseInt(selected), 10);
  }

  const bombNumberOptionValues = () => {
    let options = [];
    
    for (var i = 0; i < maxBombNumber; i++) {
      options.push(<option key={i+ 1} value={i + 1}>{i + 1}</option>);
    }

    return options;
  }

  return (
    <div>
      <span className="settings"><strong>Size X:</strong></span>
      <select
        className="form-control"
        value={sizeX}
        onChange={event => sizeXChange(event.target.value)}>
        {sizeOptionValues()}
      </select>
      <span className="settings"><strong>Size Y:</strong></span>
      <select
        className="form-control"
        value={sizeY}
        onChange={event => sizeYChange(event.target.value)}>
        {sizeOptionValues()}
      </select>
      <span className="settings"><strong>Bomb Number:</strong></span>
      <select
        className="form-control"
        value={bombNumber}
        onChange={event => bombNumberChange(event.target.value)}>
        {bombNumberOptionValues()}
      </select>
    </div>
  );
}

export default Header;
