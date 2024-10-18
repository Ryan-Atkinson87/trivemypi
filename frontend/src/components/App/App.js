import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Use BrowserRouter
import './App.css';

import Root from '../Root/Root';
import Home from '../Home/Home';
import About from '../About/About';
import PiStats from '../PiStats/PiStats';
import PiControl from '../PiControl/PiControl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className="Header" />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Root />} />
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pi-stats" element={<PiStats />} />
              <Route path="/pi-control" element={<PiControl />} />
          </Routes>
        </div>
        <Footer className="Footer" />
      </div>
    </BrowserRouter>
  );
}

export default App;
