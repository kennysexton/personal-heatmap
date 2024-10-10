import React from 'react';
import PropTypes from 'prop-types';
import { activityOptions } from '../constants/activityOptions';

function Dropdown({ value, onChange }) {
    return (
      <select className='text-lg' value={value} onChange={onChange}>
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value} className='text-base'>
            {option.label}
          </option>
        ))}
      </select>
    );
  };


  Dropdown.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  export default Dropdown

