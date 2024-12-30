import type { UiWallet } from '@wallet-standard/react';
import React from 'react';
import { cn } from './dropdown';

type Props = Readonly<{
    children?: React.ReactNode;
    loading?: boolean;
    wallet: UiWallet;
}>;

export function WalletMenuItemContent({ children, loading, wallet }: Props) {
    return (
        <div className="flex items-center gap-3 w-full">
            <div className={cn("relative", loading && "animate-pulse")}>
                <div className="">
                    <img src={wallet.icon} alt={wallet.name} className='w-8' />
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    </div>
                )}
            </div>
            <span className="truncate text-sm font-semibold">
                {children ?? wallet.name}
            </span>
        </div>
    );
}