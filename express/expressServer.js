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
  exec('python ./conversions/test.py', (error, stdout, stderr) => {
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