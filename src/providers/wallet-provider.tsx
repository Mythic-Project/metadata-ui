import { UiWalletAccount, uiWalletAccountBelongsToUiWallet, uiWalletAccountsAreSame, useWallets } from "@wallet-standard/react"
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react"
import * as React from "react";
import {Connection} from "solana-web3js-v1";

const SolanaWalletContext = React.createContext<
  readonly [
    selectedWalletAccount: UiWalletAccount | undefined,
    setSelectedWalletAccount: Dispatch<SetStateAction<UiWalletAccount | undefined>>,
    connection: Connection | undefined
  ]
>([undefined, () => {}, undefined])

export function useSolanaWallet() {
  return React.useContext(SolanaWalletContext)
}

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const wallets = useWallets()
  const [selectedWalletAccount, setSelectedWalletAccountInternal] = useState<UiWalletAccount | undefined>(undefined)
  const connection = new Connection(process.env.REACT_APP_RPC_ENDPOINT as string);

  const setSelectedWalletAccount: Dispatch<SetStateAction<UiWalletAccount | undefined>> = (setStateAction) => {
    setSelectedWalletAccountInternal((prevSelectedWalletAccount) => {
      const nextWalletAccount =
        typeof setStateAction === 'function' ? setStateAction(prevSelectedWalletAccount) : setStateAction
      return nextWalletAccount
    })
  }
  
  const walletAccount = useMemo(() => {
    if (selectedWalletAccount) {
      for (const uiWallet of wallets) {
        for (const uiWalletAccount of uiWallet.accounts) {
          if (uiWalletAccountsAreSame(selectedWalletAccount, uiWalletAccount)) {
            return uiWalletAccount
          }
        }
        if (uiWalletAccountBelongsToUiWallet(selectedWalletAccount, uiWallet) && uiWallet.accounts[0]) {
          return uiWallet.accounts[0]
        }
      }
    }
  }, [selectedWalletAccount, wallets])

  useEffect(() => {
    if (selectedWalletAccount && !walletAccount) {
      setSelectedWalletAccountInternal(undefined)
    }
  }, [selectedWalletAccount, walletAccount])

  return (
    <SolanaWalletContext.Provider 
      value={useMemo(() => [walletAccount, setSelectedWalletAccount, connection], [walletAccount])}>
      {children}
    </SolanaWalletContext.Provider>
  )
}
