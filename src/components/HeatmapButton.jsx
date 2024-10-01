import React from 'react';
import PropTypes from 'prop-types';


function HeatmapButton({ onClick, text }) {
  return (
    <button className="bg-sky-500 text-white m-6 px-4 py-2 rounded" onClick={onClick}>
      {text}
    </button>
  );
}

HeatmapButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default HeatmapButton;