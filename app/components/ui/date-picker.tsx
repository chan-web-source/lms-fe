import { useState } from 'react';
import { DateRange, type Range } from 'react-date-range';
import { addMonths, differenceInDays } from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { ChevronDown } from 'lucide-react';

export function DateRangePopover({ onApply }: { onApply: (range: Range) => void }) {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (ranges: any) => {
    const selected = ranges.selection;
    const days = differenceInDays(selected.endDate ?? new Date(), selected.startDate ?? new Date());

    if (days > 30) {
      setError('You should only be able select only 1 month period date range.');
      setDateRange(selected);
    } else {
      setError('');
      setDateRange(selected);
    }
  };

  const handleApply = () => {
    if (!error) {
      onApply(dateRange);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="py-1.75 px-2.5  bg-white font-normal text-[#444955]">
          Date <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={12}
        className="w-auto p-0 mr-5 mt-1 rounded-xl shadow-xl border border-border z-50"
      >
        <div className="flex flex-col custom-rdr text-sm">
          <DateRange
            editableDateInputs={false}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            showMonthAndYearPickers={false}
            months={2}
            direction="horizontal"
            rangeColors={['#5E2C04', '#FFFFFF']}
            showDateDisplay={false}
            ranges={[dateRange]}
            maxDate={addMonths(new Date(), 12)}
            weekdayDisplayFormat="EE"
            locale={enGB}
            className="text-[14px] custom-date-range relative"
            classNames={{
              nextButton: 'absolute !bg-[#FFFFFF] top-4 right-2',
              prevButton: 'absolute !bg-[#FFFFFF] top-4 left-2',
              monthAndYearWrapper: '!h-0',
            }}
            color="#ff0000"
          />

          {error && (
            <p className="text-[#5E2C04] text-sm font-medium text-center py-2 border-t border-border">
              {error}
            </p>
          )}

          <div className="flex justify-between items-center px-4 py-3 border-t border-border bg-white ">
            <span className="text-sm text-muted-foreground font-medium">
              Range:{' '}
              <span className="text-black font-semibold">
                {dateRange.startDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}{' '}
                -{' '}
                {dateRange.endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </span>
            </span>

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
                variant={'outline'}
                onClick={handleApply}
                disabled={!!error}
                className="h-8 px-4 text-sm bg-[#663100] text-white hover:bg-[#5E2C04] hover:text-white"
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
