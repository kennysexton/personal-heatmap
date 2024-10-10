import { useState } from 'react';
import PropTypes from 'prop-types';
import HeatmapButton from './HeatmapButton';
import ConversionDisplay from './ConversionDisplay';

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

  const [CombineisLoading, setCombineIsLoading] = useState(false);
  const [Combineoutput, setCombineOutput] = useState('');
  const [Combineerror, setCombineError] = useState('');

  // Generic async caller that allows for different set states to be passed in as args
  const useAsyncAction = (setIsLoading, setOutput, setError) => {
    const runAsyncAction = async (actionFunction, ...args) => {
      setIsLoading(true);
      setOutput('');
      setError('')

      try {
        const response = await actionFunction(...args);
        const data = await response.json();
        setOutput(data.output);
      } catch (err) {
        setError(`Failed to run script: ${err.code} ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    return runAsyncAction;
  };

  const runConversionScripts = async () => {
    runGPXConversion(fetch, 'http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["gpx_to_geojson.py", activityType])
    });

    runTCXConversion(fetch, 'http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["tcx_to_geojson.py", activityType])
    });

    runFITConversion(fetch, 'http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["fit_to_geojson.py", activityType])
    });
  };

  const runCombineScript = async () => {
    runCombine(fetch, 'http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["combine_geojson.py", activityType])
    });

  };

  const runGPXConversion = useAsyncAction(setGPXIsLoading, setGPXOutput, setGPXError)
  const runTCXConversion = useAsyncAction(setTCXIsLoading, setTCXOutput, setTCXError)
  const runFITConversion = useAsyncAction(setFITIsLoading, setFITOutput, setFITError)

  const runCombine = useAsyncAction(setCombineIsLoading, setCombineOutput, setCombineError)

  return (
    <div>
      <HeatmapButton onClick={() => runConversionScripts()} text='Convert wearable files to .geojson' disabled={GPXisLoading || TCXisLoading || FITisLoading} />
      <div className='flex flex-col'>
        <ConversionDisplay isLoading={GPXisLoading} fileFormat=".gpx" output={GPXoutput} error={GPXerror} />
        <ConversionDisplay isLoading={TCXisLoading} fileFormat=".tcx" output={TCXoutput} error={TCXerror} />
        <ConversionDisplay isLoading={FITisLoading} fileFormat=".fit" output={FIToutput} error={FITerror} />
      </div>

      <HeatmapButton onClick={() => runCombineScript()} text={`Combine all ${activityType} outputs`} />
      <ConversionDisplay isLoading={CombineisLoading} output={Combineoutput} error={Combineerror} />
    </div>
  );
};

Scripts.propTypes = {
  activityType: PropTypes.string.isRequired,
};

export default Scripts;