import React from 'react';
import './Field.css';

const Field = ({field, j, revealField}) => {
  const onFieldClick = () => {
    revealField(j);
  }

  return (
    <span className="field" onClick={onFieldClick}>
      <span className="text">
        {field}
      </span>
    </span>
  );
}

export default Field;
