import PropTypes from 'prop-types';
import Spinner from './Spinner';

function ConversionDisplay({ isLoading, task, output, error }) {
    return (
        <div className='flex m-4 flex-row'>
            {isLoading && <Spinner/>}
        
            {task}
            {output && <pre>{output}</pre>}
            {error && <pre style={{ color: 'red' }}>{error}</pre>}
        </div>
    );
};

ConversionDisplay.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    task: PropTypes.string,
    output: PropTypes.string,
    error: PropTypes.string
};

export default ConversionDisplay

