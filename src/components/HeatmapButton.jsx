import PropTypes from 'prop-types';


function HeatmapButton({ onClick, text, disabled = false }) {
  return (
    <button className={`text-white m-4 px-4 py-2 rounded 
    ${disabled 
          ? 'bg-gray-400' 
          : 'bg-sky-500 hover:bg-sky-400'}
          `} onClick={onClick} disabled={disabled}>
      <p className='text-base'>{text}</p>
    </button>
  );
}

HeatmapButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default HeatmapButton;