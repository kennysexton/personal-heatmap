import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeatmapButton from './HeatmapButton';
import ConversionDisplay from './ConversionDisplay';
import Spinner from './Spinner';

function Scripts({ activityType }) {

  const [GPXisLoading, setGPXIsLoading] = useState(false);
  const [GPXoutput, setGPXOutput] = useState('');
  const [GPXerror, setGPXError] = useState('');

  const [TCXisLoading, setTCXIsLoading] = useState(false);
  const [TCXoutput, setTCXOutput] = useState('');
  const [TCXerror, setTCXError] = useState('');

  const [FITisLoading, setFITIsLoading] = useState(false);
  const [FIToutput, setFITOutput] = useState('');
  const [FITerror, setFITError] = useState('');

  // Generic async caller that allows for different set states to be passed in as args
  const useAsyncAction = (setIsLoading, setOutput, setError) => {
    const runAsyncAction = async (actionFunction, ...args) => {
      setIsLoading(true);

      try {
        const response = await actionFunction(...args);
        const data = await response.json();
        setOutput(data.output);
      } catch (err) {
        setError(`Failed to run script: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    return runAsyncAction;
  };

  const runConversionScripts = async () => {
    runGPXConversion(fetch, 'http://localhost:3000/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["gpx_to_geojson.py", activityType])
    });

    runTCXConversion(fetch, 'http://localhost:3000/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["tcx_to_geojson.py", activityType])
    });

    runFITConversion(fetch, 'http://localhost:3000/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["fit_to_geojson.py", activityType])
    });
  };

  const runGPXConversion = useAsyncAction(setGPXIsLoading, setGPXOutput, setGPXError)
  const runTCXConversion = useAsyncAction(setTCXIsLoading, setTCXOutput, setTCXError)
  const runFITConversion = useAsyncAction(setFITIsLoading, setFITOutput, setFITError)

  return (
    <div>
      <HeatmapButton onClick={() => runConversionScripts()} text='Convert wearable files to .geojson' disabled={GPXisLoading || TCXisLoading || FITisLoading} />
      <div className='flex flex-col'>
        <ConversionDisplay isLoading={GPXisLoading} fileFormat=".gpx" output={GPXoutput} error={GPXerror} />
        <ConversionDisplay isLoading={TCXisLoading} fileFormat=".tcx" output={TCXoutput} error={TCXerror} />
        <ConversionDisplay isLoading={FITisLoading} fileFormat=".fit" output={FIToutput} error={FITerror} />
      </div>

      <HeatmapButton onClick={() => runConversionScripts} text={`Combine all ${activityType} outputs`} disabled={true} />

    </div>
  );
};

Scripts.propTypes = {
  activityType: PropTypes.string.isRequired,
};

export default Scripts;