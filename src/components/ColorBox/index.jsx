import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ColorBox(props) {
  const [color, setColor] = useState('white');
  return (
    <div>
      {color}
      <button onClick={() => setColor('black')}>Change to black</button>
      <button onClick={() => setColor('white')}>Change to white</button>
    </div>
  );
}

ColorBox.propTypes = {};

export default ColorBox;
