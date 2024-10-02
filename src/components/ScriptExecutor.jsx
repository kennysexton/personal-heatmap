import React, { useState } from 'react';
import HeatmapButton from './HeatmapButton';

const ScriptExecutor = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runScript = async () => {
    try {
      const response = await fetch('http://localhost:3000/run-script', {
        method: 'POST',
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
      <HeatmapButton onClick={runScript} text='Run script'/>
      {output && <pre>{output}</pre>}
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
    </div>
  );
};

export default ScriptExecutor;