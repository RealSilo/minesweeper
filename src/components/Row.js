import React from 'react';
import './Row.css';
import Field from './Field';

const Row = ({row, revealField, markBomb}) => {
  const fields = row.map((field, index) => {
    return (
      <span key={index}>
        <Field
          value={field['value']}
          state={field['state']}
          j={index}
          revealField={(j) => revealField(j)}
          markBomb={(j) => markBomb(j)}
        />
      </span>
    );
  });

  return (
    <div>
     {fields}
    </div>
  );
}

export default Row;
