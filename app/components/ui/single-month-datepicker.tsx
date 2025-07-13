import { useState } from 'react';
import { Calendar } from 'react-date-range';
import { addMonths } from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

export function SingleDatePopover({
  value,
  onApply,
}: {
  value: Date;
  onApply: (date: Date) => void;
}) {
  const [tempDate, setTempDate] = useState<Date>(value);
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    onApply(tempDate);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setTempDate(value);
      }}
    >
      <PopoverTrigger asChild>
        <CalendarIcon className="w-5 h-5 text-[#444955] cursor-pointer" />
      </PopoverTrigger>

      <PopoverContent
        sideOffset={12}
        className="w-auto p-0 mr-5 mt-1 rounded-xl shadow-xl border border-border z-50"
      >
        <div className="flex flex-col text-sm bg-white">
          <Calendar
            date={tempDate}
            onChange={(date: Date) => setTempDate(date)}
            maxDate={addMonths(new Date(), 12)}
            showMonthAndYearPickers={false}
            locale={enGB}
            className="text-[14px] relative"
            classNames={{
              nextButton: 'absolute !bg-gray-100 top-4 right-2',
              prevButton: 'absolute !bg-gray-100 top-4 left-2',
              monthAndYearWrapper: '!h-10',
              daySelected: '!bg-[#600100] text-white',
            }}
            color="#5E2C04"
          />

          <div className="flex justify-between items-center px-4 py-3 border-t border-border">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-sm text-muted-foreground"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                className="h-8 px-4 text-sm bg-[#C4C4C4] ml-50 text-white"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
