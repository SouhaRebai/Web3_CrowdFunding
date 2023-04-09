import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';
const rootElement = document.getElementById('root');
//add tailwind to the app : tp simplify the process of writing CSS
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Hardhat}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>,
  rootElement
);
