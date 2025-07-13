import React, { useEffect } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { cn } from '~/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import 'react-phone-number-input/style.css';
import type { Country } from 'react-phone-number-input';
import { getCountries, getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input';
import { ScrollArea } from '~/components/ui/scroll-area';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onChangeCode: (code: string) => void;
  error?: boolean;
}

const countries = getCountries();

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      onChangeCode,
      className,
      error,
      placeholder = 'Enter phone number',
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState<Country>('US');
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');

    // Set given number and zone code if have
    useEffect(() => {
      const phoneNumberCountry = parsePhoneNumber(value);
      if (phoneNumberCountry) {
        setSelectedCountry(phoneNumberCountry?.country ?? 'US');
        onChangeCode(phoneNumberCountry?.countryCallingCode ?? '1');
        setPhoneNumber(phoneNumberCountry?.nationalNumber ?? '');
        onChange(phoneNumberCountry?.nationalNumber ?? '');
      }
    }, []);

    const handleCodeSelectionChange = (value: string) => {
      // Allow digits, plus sign, spaces, parentheses, and hyphens
      onChangeCode(getCountryCallingCode(value as Country));
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // Allow digits, plus sign, spaces, parentheses, and hyphens
      const sanitizedValue = newValue.replace(/[^\d\s+()-]/g, '');
      setPhoneNumber(sanitizedValue);
      onChange(sanitizedValue);
    };

    return (
      <div className="flex ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'h-[50x] w-[120px] justify-between rounded-r-none border-r-0 border-gray-300 bg-white text-sm pl-4',
                error && 'border-destructive focus-visible:ring-destructive',
              )}
            >
              {selectedCountry ? `+${getCountryCallingCode(selectedCountry)}` : 'Select'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] bg-white p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9" />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandList>
                <ScrollArea className="h-[200px]">
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country}
                        value={country}
                        onSelect={(currentValue: string) => {
                          setSelectedCountry(currentValue.toUpperCase() as Country);
                          handleCodeSelectionChange(currentValue);
                          setOpen(false);
                        }}
                        className="bg-white text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedCountry === country ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {country} (+{getCountryCallingCode(country)})
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          ref={ref}
          type="tel"
          className={cn(
            'h-[50px] rounded-l-none border-gray-300 bg-white',
            error && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
