import React from 'react';
import { EmailIcon } from '~/assets/icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

interface ResendLoginCredDialogProps {
  onResend: () => void;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const ResendLoginCred = ({ onResend, children, open, setOpen }: ResendLoginCredDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
            <EmailIcon />
          </div>
        </div>

        <DialogHeader className="items-center">
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
            Resend Login Credentials
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-gray-500">
            Are you sure you want to resend the login credentials? A new email will be sent to the
            user with their login information.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8 flex-row gap-4 justify-center">
          <DialogClose asChild>
            <button
              className="w-full border border-gray-300 rounded-lg px-10 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-100"
              type="button"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            className="w-full rounded-lg px-10 py-3 text-base font-medium text-white"
            style={{ background: 'linear-gradient(90deg, #9B7C0D 0%, #EDCA4E 100%)' }}
            type="button"
            onClick={onResend}
          >
            Resend
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResendLoginCred;
