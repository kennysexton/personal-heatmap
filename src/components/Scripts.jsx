import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeatmapButton from './HeatmapButton';

function Scripts({activityType}) {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runScript = async (args) => {
    console.log(`scripts ${args}`)

    try {
      const response = await fetch('http://localhost:3000/run-script', {
        method: 'POST',
        body: JSON.stringify(args)
      });
      const data = await response.json();
      setOutput(data.output);
      setError(data.error);
    } catch (err) {
      setError('Failed to run script: ' + err.message);
    }
  };

  return (
    <div>
      <HeatmapButton onClick={runScript(["gpx_to_geojson.py", activityType])} text='Convert .gpx'/>
      <HeatmapButton onClick={runScript} text='Convert .fit' />
      <HeatmapButton onClick={runScript} text='Convert .tcx' />

      <HeatmapButton onClick={runScript} text={`Combine all ${activityType} outputs`} />


      {output && <pre>{output}</pre>}
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
    </div>
  );
};

Scripts.propTypes = {
  activityType: PropTypes.string.isRequired,
};

export default Scripts;