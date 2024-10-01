import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Map from './routes/Map';
import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/map' element={<Map/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
