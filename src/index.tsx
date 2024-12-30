import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SolanaWalletProvider } from './providers/wallet-provider';
import TanstackProvider from "./providers/tanstack-provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TanstackProvider>
      <SolanaWalletProvider>
        <App />
      </SolanaWalletProvider>
    </TanstackProvider>
  </React.StrictMode>
);
