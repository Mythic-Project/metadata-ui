import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert";
import { useState } from "react";
import { getWalletErrorMessage } from "./error-message";
import * as React from "react"

type Props = Readonly<{
  error: unknown;
  onClose?(): false | void;
  title?: string;
}>;

export function WalletErrorDialog({ error, onClose, title }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (!onClose || onClose() !== false) {
            setIsOpen(false);
          }
        }
      }}
    >
      <AlertDialogContent className="bg-[#dddddd]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            {title ?? "We encountered the following error"}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 rounded-lg border border-muted bg-muted/50 p-4">
            {getWalletErrorMessage(error, "Unknown")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <div className="cursor-pointer">Close</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}