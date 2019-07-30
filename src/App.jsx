import React from 'react';
import Routes from './components/Routes';
import { BrowserRouter } from 'react-router-dom';
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
