import React from 'react';
import './Field.css';
import FontAwesome from 'react-fontawesome';

const Field = ({value, state, j, revealField, markBomb}) => {
  const onFieldClick = (e) => {
    if (e.button === 0) {
      if (state !== 'marked') {
        revealField(j);
      }
    } else if (e.button === 2){
      markBomb(j);
    }
  }

  const fieldValue = () => {
    if (state === 'revealed') {
      return <span className="text">{value === 'b' ? <FontAwesome name="bomb"/> : value}</span>
    } else if (state === 'closed') {
      return <span className="text hidden">{value}</span>
    } else if (state === 'marked') {
      return <span className="text"><FontAwesome name="flag"/></span>
    }
  }

  return (
    <span className="field" onClick={onFieldClick} onContextMenu={onFieldClick}>
      {fieldValue()}
    </span>
  );
}

export default Field;
