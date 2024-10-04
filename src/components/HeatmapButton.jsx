import PropTypes from 'prop-types';


function HeatmapButton({ onClick, text, disabled = false }) {
  return (
    <button className={`text-white m-6 px-4 py-2 rounded 
    ${disabled 
          ? 'bg-gray-400' 
          : 'bg-sky-500 hover:bg-sky-400'}
          `} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

HeatmapButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default HeatmapButton;