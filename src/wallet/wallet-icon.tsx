import type { UiWalletAccount } from '@wallet-standard/react';
import { uiWalletAccountBelongsToUiWallet, useWallets } from '@wallet-standard/react';
import * as React from "react";
import { cn } from './dropdown';

interface WalletAccountIconProps {
    account: UiWalletAccount;
    additionalClass?: string
}

export function WalletAccountIcon({ account, additionalClass, ...props }: WalletAccountIconProps) {
    const wallets = useWallets();
    let icon;
    
    if (account.icon) {
        icon = account.icon;
    } else {
        for (const wallet of wallets) {
            if (uiWalletAccountBelongsToUiWallet(account, wallet)) {
                icon = wallet.icon;
                break;
            }
        }
    }

    return (
        icon ?
            <div className="">
                <img src={icon} alt={account.label || 'wallet'} className={cn(additionalClass)} />
            </div> :
            <div className="">
            </div>
        )    
}