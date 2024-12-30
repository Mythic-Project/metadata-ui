import React, { useState } from 'react';
import Wallet from './wallet';
import MainForm from './main-form';
import { Buffer } from 'buffer';
import BrandingForm from './branding-form';

function App() {
  window.Buffer = Buffer
  const [page, setPage]  = useState(0)
  const params = new URLSearchParams(window.location.search)
  const [realmAddress, setRealmAddress] = useState<string>(params.get('realm') ?? "");

  return (
    <div className="relative">
      <div className="radiant-background w-full h-60 md:h-80 rotate-[-180deg] absolute"></div>
      <header className="relative p-4 md:p-12 flex z-10 justify-between items-center">
        <div>
        <img src="./logo.png" alt="mythic metadata logo" className='w-12 md:w-14' />
        </div>
        <Wallet />
      </header>
      {
        page === 0 ?
          <MainForm setPage={setPage} realmAddress={realmAddress} setRealmAddress={setRealmAddress} /> :
        page === 1 ?
          <BrandingForm realmAddress={realmAddress} /> :
          ""
      }
    </div>
  )
}



export default App;
