import * as React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';

import { App } from './App';

import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMaskProvider } from './hooks';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <MetaMaskProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MetaMaskProvider>
  </Web3ReactProvider>,
  document.getElementById('app')
);
