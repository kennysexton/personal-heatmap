import PropTypes from 'prop-types';


function HeatmapButton({ onClick, text, className = '', disabled = false, vertical = false }) {
  return (
    <button className={`text-white m-4 px-4 py-2 rounded ${className}
    ${disabled
        ? 'bg-gray-400'
        : 'bg-sky-500 hover:bg-sky-400'}      
    ${vertical
        ? 'rotate-90'
        : ''}`}
      onClick={onClick} disabled={disabled}>
      <p className='text-base'>{text}</p>
    </button>
  );
}

HeatmapButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default HeatmapButton;