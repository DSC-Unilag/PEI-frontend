import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
