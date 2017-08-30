import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const Header = (
  {
    sizeX,
    sizeY,
    maxBombNumber,
    bombNumber,
    lastTime,
    bestTime,
    wins,
    onBombNumberChange,
    onSizeXChange,
    onSizeYChange
  }) => {

  const bombNumberChange = (selected) => {
    onBombNumberChange(selected['value']);
  }

  const sizeXChange = (selected) => {
    onSizeXChange(selected['value']);
  }

  const sizeYChange = (selected) => {
    onSizeYChange(selected['value']);
  }

  const getBombNumberOptions = () => {
    let options = [];
    
    for (var i = 0; i < maxBombNumber; i++) {
      options.push({value: i + 1, label: `${i + 1}` });
    }

    return options;
  }

  const getSizeOptions = () => {
    let options = [];
    
    for (var i = 0; i < 10; i++) {
      options.push({value: i + 1, label: `${i + 1}` });
    }

    return options;
  }

  const bombNumberOptions = getBombNumberOptions();
  const sizeOptions = getSizeOptions();
  // window.options = options;

  return (
    <div className="row">
      <div className="col-md-12">
        <span>Size X</span>
        <Select
          name="form-field-name"
          value={sizeX}
          options={sizeOptions}
          onChange={sizeXChange}
        />
        <span>Size Y</span>
        <Select
          name="form-field-name"
          value={sizeY}
          options={sizeOptions}
          onChange={sizeYChange}
        />
        <span className="select">
          <span>BombNumber</span>
          <Select
            name="form-field-name"
            value={bombNumber}
            options={bombNumberOptions}
            onChange={bombNumberChange}
          />
        </span>
      </div>
      <div className="col-md-12">
        <span>Last time: {lastTime} </span>
        <span>Best time: {bestTime} </span>
        <span>Wins: {wins}</span>
      </div>
    </div>
  );
}

export default Header;
