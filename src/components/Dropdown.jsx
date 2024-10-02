import React from 'react';
import PropTypes from 'prop-types';
import { activityOptions } from '../constants/activityOptions';

function Dropdown({ value, onChange }) {
    return (
      <select value={value} onChange={onChange}>
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value}>
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

