import { DropdownMenuSeparator } from './dropdown'
import { UiWallet, UiWalletAccount, useDisconnect, useWallets } from '@wallet-standard/react'
import { Copy, LogOut } from 'lucide-react'
import * as React from "react"
import { WalletAccountIcon } from './wallet-icon'

interface ConnectedWalletContentProps {
  account: UiWalletAccount
  wallet: UiWallet
  onDisconnect: (wallet: UiWallet) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
}

export function ConnectedWalletContent({
  account,
  wallet,
  onDisconnect,
  onError,
  setOpen,
}: ConnectedWalletContentProps) {
  // const { toast } = useToast()
  // const toastError = useToastError()

  // Get fresh wallet instances
  const wallets = useWallets()
  const currentWallet = wallets.find((w) => w.name === wallet.name)
  const [isDisconnecting, disconnect] = useDisconnect(currentWallet || wallet)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.address)
    // toast({ variant: 'default', title: 'Address copied to clipboard' })
  }

  const handleDisconnect = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (!currentWallet) {
        // toastError('Wallet not found')
        return
      }
      await disconnect()
      onDisconnect(currentWallet)
      setOpen(false)
    } catch (error) {
      onError(error)
      // toastError('Failed to disconnect wallet')
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full">
        <div className="relative">
          <WalletAccountIcon additionalClass="h-12 w-12 rounded-lg bg-foreground/10 p-2" account={account} />
        </div>
        <div className="w-full">
            <div className="flex gap-4 items-center group p-0 hover:bg-transparent cursor-pointer" onClick={handleCopy}>
              <span className="text-sm font-mono text-foreground/90 group-hover:text-foreground">
                {`${account.address.slice(0, 4)}····${account.address.slice(-4)}`}
              </span>
              <Copy className="h-4 w-4 text-foreground/50" />
            </div>
        </div>
      </div>
      <DropdownMenuSeparator />

      <div className="p-2">
        <div
          className="w-full gap-2 flex items-center"
          onClick={handleDisconnect}
        >
          <LogOut className="h-4 w-4" />
          {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
        </div>
      </div>
    </>
  )
}
