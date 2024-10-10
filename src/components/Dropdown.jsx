import React from 'react';
import PropTypes from 'prop-types';
import { activityOptions } from '../constants/activityOptions';

function Dropdown({ value, onChange }) {
    return (
      <select className='m-5 text-lg bg-[#292929] w-auto' value={value} onChange={onChange}>
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value} className='text-base bg-[#292929]'>
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

