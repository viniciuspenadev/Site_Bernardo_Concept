import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GrandPalace from './pages/GrandPalace';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grand-palace" element={<GrandPalace />} />
      </Routes>
    </Router>
  );
};

export default App;