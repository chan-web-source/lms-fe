import React, { type Dispatch, type SetStateAction } from 'react';
import { EmailIcon } from '~/assets/icons';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface ResetPassSuccessProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ResetPassSuccess = ({ open, setOpen }: ResetPassSuccessProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
            <EmailIcon />
          </div>
        </div>

        <DialogHeader className="items-center">
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
            Email has been sent!
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-gray-500">
            Reset password link is sent to the user registered email where user can reset the
            password
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8 flex-row gap-4 justify-center">
          <DialogClose asChild>
            <Button className="w-full px-10 py-3 ">DONE</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassSuccess;
