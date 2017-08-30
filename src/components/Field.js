import React from 'react';
import './Field.css';

const Field = ({value, revealed, j, revealField}) => {
  const onFieldClick = () => {
    revealField(j);
  }

  return (
    <span className="field" onClick={onFieldClick}>
      {revealed === 'revealed' ? (
        <span className="text">
          {value}
        </span>
        ) : (
        <span className="text hidden">
          {value}
        </span>
        )
      }
    </span>
  );
}

export default Field;
