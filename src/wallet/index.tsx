import { UiWalletAccount, uiWalletAccountBelongsToUiWallet, useWallets } from "@wallet-standard/react"
import { useSolanaWallet } from "../providers/wallet-provider"
import React, { useRef, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown"
import { StandardConnect, StandardDisconnect } from "@wallet-standard/core"
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { WalletAccountIcon } from "./wallet-icon"
import { ChevronDownIcon, Wallet2 } from "lucide-react"
import { ConnectedWalletContent } from "./connected-wallet-content"
import { DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { WalletList } from "./wallet-list"
import { WalletErrorDialog } from "./wallet-error"

interface WalletTriggerProps {
  selectedWalletAccount: UiWalletAccount | undefined
  children: React.ReactNode
  type: 'dialog' | 'dropdown'
}

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

function WalletTrigger({ selectedWalletAccount, children, type }: WalletTriggerProps) {
  const TriggerComponent = type === 'dialog' ? DialogTrigger : DropdownMenuTrigger

  return (
    <TriggerComponent asChild>
      <div className="bg-black text-sm md:text-md items-center
       px-4 py-2 text-[#F0F1F5] flex gap-2 rounded-full cursor-pointer"
      >
        {selectedWalletAccount ? (
          <>
            <WalletAccountIcon account={selectedWalletAccount} additionalClass='w-6' />
            <span>{selectedWalletAccount.address.slice(0, 8)}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </>
        ) : (
          children
        )}
      </div>
    </TriggerComponent>
  )
}

export default function Wallet(
) {
  const wallets = useWallets()
  const [selectedWalletAccount, setSelectedWalletAccount] = useSolanaWallet()
  const { current: NO_ERROR } = useRef(Symbol())
  const [error, setError] = useState<symbol>(NO_ERROR)
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const standardWallets = [...wallets].filter(
    (wallet) => wallet.features.includes(StandardConnect) && wallet.features.includes(StandardDisconnect),
  )

  const handleError = (err: unknown) => {
    setError(err as symbol)
  }
  if (selectedWalletAccount) {
    const selectedWallet = [...wallets].find((wallet) =>
      wallet.accounts.some((account) => account.address === selectedWalletAccount.address),
    )
    return (
      <>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <WalletTrigger selectedWalletAccount={selectedWalletAccount} type="dropdown">
            Connect Wallet
          </WalletTrigger>

          <DropdownMenuContent align="end" className="w-[240px] bg-black text-white">
            <ConnectedWalletContent
              account={selectedWalletAccount}
              wallet={selectedWallet!}
              onDisconnect={(wallet) => {
                if (selectedWalletAccount && uiWalletAccountBelongsToUiWallet(selectedWalletAccount, wallet)) {
                  setSelectedWalletAccount(undefined)
                }
              }}
              onError={handleError}
              setOpen={setOpen}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <WalletTrigger selectedWalletAccount={selectedWalletAccount} type="dialog">
          <div className="bg-black text-sm md:text-md px-4 text-[#F0F1F5] flex gap-2 rounded-full cursor-pointer">
            <Wallet2 className="text-sm" />
            Connect
          </div>
        </WalletTrigger>

        <DialogContent className="sm:max-w-[350px] !rounded-2xl px-4 pb-4 pt-2.5 bg-[#dddddd]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Connect a Wallet</DialogTitle>
          </DialogHeader>

          <WalletList
            wallets={[...wallets]}
            standardWallets={standardWallets}
            onAccountSelect={setSelectedWalletAccount}
            onDisconnect={(wallet) => {
              if (selectedWalletAccount && uiWalletAccountBelongsToUiWallet(selectedWalletAccount, wallet)) {
                setSelectedWalletAccount(undefined)
              }
            }}
            onError={handleError}
            setOpen={setOpen}
            variant="dialog"
          />
        </DialogContent>
      </Dialog>

      {error !== NO_ERROR && <WalletErrorDialog error={error} onClose={() => setError(NO_ERROR)} />}
    </>
  )
}