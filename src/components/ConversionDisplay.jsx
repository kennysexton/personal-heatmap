import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

function ConversionDisplay({ isLoading, fileFormat, output, error }) {
    return (
        <div className='flex m-4'>
            {isLoading && <Spinner/>}
            {isLoading && <p>{isLoading}</p>}
            {fileFormat}:

            {output && <pre>{output}</pre>}
            {error && <pre style={{ color: 'red' }}>{error}</pre>}

        </div>
    );
};


ConversionDisplay.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fileFormat: PropTypes.string,
    output: PropTypes.string,
    error: PropTypes.string
};

export default ConversionDisplay

