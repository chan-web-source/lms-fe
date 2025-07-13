import { Dialog, DialogContent, DialogHeader, DialogFooter } from '~/components/ui/dialog';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { cn } from '~/lib/utils';
import Excel from '~/assets/icons/excel-sheet';
import Csv from '~/assets/icons/csv';
import { DownloadCircleIcon } from '~/assets/icons';

interface DownloadLogModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (format: 'csv' | 'excel') => void;
}

export const DownloadLogModal = ({ open, onClose, onConfirm }: DownloadLogModalProps) => {
  const [format, setFormat] = useState<'csv' | 'excel'>('csv');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] rounded-2xl text-center px-6 py-8 shadow-lg border-none">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#efefef] mb-4 ml-4">
              <DownloadCircleIcon />
            </div>
          </div>
          <h2 className="text-[32px] text-center font-semibold text-black">Download Report</h2>
          <p className="text-sm text-muted-foreground mt-[-10px] text-center text-[20px]">
            This report will be downloaded as a <span>{format === 'csv' ? '.CSV' : '.XLSX'}</span>{' '}
            file.
          </p>
        </DialogHeader>

        <div className="text-left">
          <p className=" mt-[-10px] text-sm font-medium mb-2 text-[16px]">
            Method<span className="text-red-500">*</span>
          </p>

          <RadioGroup
            value={format}
            onValueChange={(val) => setFormat(val as 'csv' | 'excel')}
            className="flex gap-4"
          >
            {/* CSV Option */}
            <label
              htmlFor="csv"
              className={cn(
                'rounded-md px-4 py-3 flex items-center justify-between text-sm w-full cursor-pointer transition-all border border-solid border-[#DEDEDE]',
              )}
            >
              <div className="flex items-center gap-2">
                <Csv />
                <span className="text-stone-950 text-[20px]">CSV</span>
              </div>
              <RadioGroupItem value="csv" id="csv" className="data-[state=checked]:bg-yellow-700" />
            </label>

            <label
              htmlFor="excel"
              className={cn(
                'rounded-md  px-4 py-6 flex items-center justify-between text-sm w-full cursor-pointer transition-all border border-solid border-[#DEDEDE]',
              )}
            >
              <div className="flex items-center gap-2">
                <Excel />
                <span className="text-stone-950 text-[20px]">Excel Format</span>
              </div>
              <RadioGroupItem
                value="excel"
                id="excel"
                className="data-[state=checked]:bg-yellow-600"
              />
            </label>
          </RadioGroup>
        </div>

        <DialogFooter className="mt-1">
          <Button
            onClick={() => onConfirm(format)}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold hover:from-yellow-600 hover:to-yellow-700"
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
