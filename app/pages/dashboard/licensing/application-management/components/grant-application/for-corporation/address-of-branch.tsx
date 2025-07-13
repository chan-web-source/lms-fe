import { MapPin } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import Heading from '~/components/typography/heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { MapLocationIcon, MapsSquareIcon, NavigationIcon, RoadLocationIcon } from '~/assets/icons';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type {
  addressOfBranchSchema,
  preferredAddressSchema,
} from '../../../schema/create-application';
import { address, cities, country, provinces } from '~/lib/address';

interface AddressOfBranchProps {
  form: UseFormReturn<z.infer<typeof addressOfBranchSchema>>;
  preferredAddressForm: UseFormReturn<z.infer<typeof preferredAddressSchema>>;
}

const AddressOfBranch = ({ form, preferredAddressForm }: AddressOfBranchProps) => {
  const onExistingAddressChange = (selectedId: number) => {
    const selectedAddress = address.find((addr) => addr.id === selectedId);

    if (selectedAddress) {
      form.setValue('address1', selectedAddress.address1 || '', { shouldDirty: true });
      form.setValue('address2', selectedAddress.address2 || '', { shouldDirty: true });
      form.setValue('city', selectedAddress.city || '', { shouldDirty: true });
      form.setValue('province', selectedAddress.province || '', { shouldDirty: true });
      form.setValue('country', selectedAddress.country || '', { shouldDirty: true });
    }
  };

  const {
    address1,
    address2,
    city,
    province: selectedProvince,
    country: selectedCountry,
  } = form.watch();

  const currentAddressId = React.useMemo(() => {
    const label = [address1, address2, city, selectedProvince, selectedCountry]
      .filter(Boolean)
      .join(', ');
    const match = address.find((addr) => {
      const addrLabel = [addr.address1, addr.address2, addr.city, addr.province, addr.country]
        .filter(Boolean)
        .join(', ');
      return addrLabel === label;
    });

    return match?.id;
  }, [address1, address2, city, selectedProvince, selectedCountry]);

  return (
    <Form {...form}>
      <form className="space-y-10 w-full border-t py-8">
        <div className="flex flex-row justify-between">
          <div>
            <Heading className="text-[22px] font-medium">
              Address of Branch Where Business is Conducted
            </Heading>
            <div className="text-[#444955] text-[18px]">
              Must be a physical address in Papua New Guinea
            </div>
          </div>
          <FormField
            control={preferredAddressForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="address_of_branch_where_business_is_conducted"
                        className="text-[#2D3139] text-[16px] cursor-pointer"
                      >
                        Set as Preferred Address for Service
                      </Label>
                      <RadioGroupItem
                        value="address_of_branch_where_business_is_conducted"
                        id="address_of_branch_where_business_is_conducted"
                        className="size-5 data-[state=checked]:bg-red-900 data-[state=checked]:border-yellow-800 data-[state=checked]:after:bg-white"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4.5">
          <div>
            <div className="text-[#2D3139] text-[16px] mb-2 font-medium">
              Use an Existing Address or Enter a New Address below.
            </div>
            <Select
              value={currentAddressId?.toString()}
              onValueChange={(selectedId) => onExistingAddressChange(parseInt(selectedId))}
            >
              <SelectTrigger size="lg" className="w-full h-12.5">
                <SelectValue placeholder="Select Address" />
              </SelectTrigger>
              <SelectContent>
                {address.map((e) => (
                  <SelectItem key={e.id} value={String(e.id)}>
                    {[e.address1, e.address2, e.city, e.province, e.country]
                      .filter(Boolean)
                      .join(', ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4.5">
          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Address Line 1 <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <Input placeholder="Address line 1" {...field} className="pl-10 h-12" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Address Line 2</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <Input
                      placeholder="Address line 2 ( optional )"
                      {...field}
                      className="pl-10 h-12"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Postal Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <RoadLocationIcon
                      width="20"
                      height="20"
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    />
                    <Input placeholder="Post code ( optional )" {...field} className="pl-10 h-12" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  City/Town <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapLocationIcon
                      svgProps={{ className: 'absolute left-3 top-1/2 -translate-y-1/2' }}
                    />
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger size="lg" className="w-full h-12.5 pl-10">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Province <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <NavigationIcon
                      svgProps={{ className: 'absolute left-3 top-1/2 -translate-y-1/2' }}
                    />
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger size="lg" className="w-full h-12.5 pl-10">
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">
                  Country <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapsSquareIcon
                      svgProps={{ className: 'absolute left-3 top-1/2 -translate-y-1/2' }}
                    />
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger size="lg" className="w-full h-12.5 pl-10">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {country.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddressOfBranch;
