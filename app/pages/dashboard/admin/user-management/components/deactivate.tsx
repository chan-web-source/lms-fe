import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '~/components/ui/dialog';
import { EditTrashIcon } from '~/assets/icons';

interface DeactivateAccDialogProps {
  onDeactivate?: () => void;
  children: React.ReactNode;
  isActive: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const DeactivateAccDialog: React.FC<DeactivateAccDialogProps> = ({
  onDeactivate,
  children,
  isActive,
  open,
  setOpen,
}) => {
  const actionText = isActive ? 'Deactivation' : 'Activation';
  const buttonText = isActive ? 'Deactivate' : 'Activate';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
            <EditTrashIcon />
          </div>{' '}
        </div>

        <DialogHeader className="items-center">
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
            Account {actionText}
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-gray-500">
            Are you sure you want to {isActive ? 'deactivate' : 'activate'} this account? This
            action will {isActive ? 'disable' : 'enable'} access for the user and may impact
            associated services.
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
            style={{ background: 'linear-gradient(90deg, #7B1D1D 0%, #B3261E 100%)' }}
            type="button"
            onClick={onDeactivate}
          >
            {buttonText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateAccDialog;
