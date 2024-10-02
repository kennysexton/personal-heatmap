import express, { json } from 'express';
import { exec } from 'child_process';
// eslint-disable-next-line no-undef
import cors from 'cors';
// const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())
app.use(json());

app.post('/run-script', (req, res) => {
  const { args } = req.body;
  console.log(JSON.stringify(req.body))

  if (!args || !Array.isArray(args)) {
    return res.status(400).json({ error: 'Invalid or missing arguments. Please provide an array of arguments. Script name will be the first argument' });
  }

  // Escape the arguments to prevent command injection
  const escapedArgs = args.map(arg => JSON.stringify(arg)).join(' ');

  const pythonCommand = `python /conversions/${escapedArgs}`;
  console.log(`Calling: ${pythonCommand}`)

  exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: error.message });
    }
    res.json({ output: stdout, error: stderr });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});