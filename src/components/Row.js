import React from 'react';
import './Row.css';
import Field from './Field';

const Row = ({row, revealField}) => {
  const fields = row.map((field, index) => {
    return (
      <span key={index}>
        <Field
          field={field}
          j={index}
          revealField={(j) => revealField(j)} />
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
