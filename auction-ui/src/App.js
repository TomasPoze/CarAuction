import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';

function App() {
  return (
    <Router>
      <Header />
      <Content />
    </Router>
  );
}

export default App;
