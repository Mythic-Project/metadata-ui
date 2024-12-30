import { UiWallet, UiWalletAccount, useConnect } from '@wallet-standard/react'
import React from 'react'
import { WalletMenuItemContent } from "./wallet-menu-item-content"
import { ConnectWalletMenuItem } from './connect-wallet-menu-item'

interface WalletButtonProps {
  wallet: UiWallet
  onAccountSelect: (account: UiWalletAccount) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
}

function WalletButton({ wallet, onAccountSelect, onError, setOpen }: WalletButtonProps) {
  const [, connect] = useConnect(wallet)

  const handleClick = async () => {
    try {
      const accounts = await connect()
      if (accounts?.[0]) {
        onAccountSelect(accounts[0])
        setOpen(false)
      }
    } catch (error) {
      onError(error)
    }
  }

  return (
    <div className="w-full justify-start p-4 cursor-pointer" onClick={handleClick}>
      <WalletMenuItemContent wallet={wallet} />
    </div>
  )
}

interface WalletListProps {
  wallets: UiWallet[]
  standardWallets: UiWallet[]
  onAccountSelect: (account: UiWalletAccount) => void
  onDisconnect: (wallet: UiWallet) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
  variant?: 'dialog' | 'dropdown'
}

export function WalletList({
  wallets,
  standardWallets,
  onAccountSelect,
  onDisconnect,
  onError,
  setOpen,
  variant = 'dropdown',
}: WalletListProps) {
  if (wallets.length === 0) {
    return (
      <div className="">
        This browser has no wallet installed.
      </div>
    )
  }

  if (variant === 'dialog') {
    return (
      <div className="space-y-2">
        {standardWallets.map((wallet, idx) => (
          <WalletButton 
            key={`wallet:${wallet.name}`} 
            wallet={wallet} 
            onAccountSelect={onAccountSelect} 
            onError={onError} 
            setOpen={setOpen} 
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {standardWallets.map((wallet) => (
          <ConnectWalletMenuItem
            onAccountSelect={(account) => {
              if (account) {
                onAccountSelect(account)
                setOpen(false)
              }
            }}
            onDisconnect={onDisconnect}
            onError={onError}
            wallet={wallet}
            key={`wallet:${wallet.name}`}
          />
      ))}
    </>
  )
}
