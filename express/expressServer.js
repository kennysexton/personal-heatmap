import express, { json } from 'express';
import { exec } from 'child_process';
import cors from 'cors';
import shellQuote from 'shell-quote';


const app = express();
const port = 3000;

app.use(cors())
app.use(json());

app.post('/run-script', (req, res) => {
  const args = req.body;
  console.log("Request received at:", new Date().toISOString());
  console.log("Request body:", req.body);

  if (!args || args.length == 0) {
    return res.status(400).json({ error: 'Invalid or missing arguments. Please provide an array of arguments. Script name will be the first argument' });
  }

  const escapedArgs = shellQuote.quote(args);

  const pythonCommand = `python ./conversions/${escapedArgs}`;
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