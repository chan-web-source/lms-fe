import { ListFilter, Search, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useState, useMemo } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { applicationFilterOptions } from '~/components/data-table/filter-option';
import type { ApplicationCategory } from '~/types/filter';
import { applicationCategoryIcons } from '~/components/data-table/category-icons';
import type { Filters } from '../types/initialfilter';

interface FilterSidebarDropdownProps {
  selected: Filters;
  setSelected: React.Dispatch<React.SetStateAction<Filters>>;
  setAppliedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: () => void;
}

export function FilterSidebarDropdown({
  selected,
  setSelected,
  setAppliedFilters,
  onApply,
}: FilterSidebarDropdownProps) {
  const [activeCategory, setActiveCategory] = useState<ApplicationCategory>('Application Status');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const Icon = applicationCategoryIcons[activeCategory];

  const filteredItems = useMemo(() => {
    const options = applicationFilterOptions[activeCategory];
    return options.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  }, [activeCategory, search]);

  const updateSelection = (value: string) => {
    setSelected((prev) => {
      const current = prev[activeCategory] || [];
      const updated = current.includes(value as never)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [activeCategory]: updated };
    });
  };

  const selectAll = () => {
    setSelected((prev) => ({
      ...prev,
      [activeCategory]: [...applicationFilterOptions[activeCategory]],
    }));
  };

  const clearFilters = () => {
    setSelected((prev: Filters) => ({
      ...prev,
      [activeCategory]: [],
    }));

    setAppliedFilters((prev: Filters) => ({
      ...prev,
      [activeCategory]: [],
    }));

    setSearch('');
    setOpen(false);
  };

  const applyFilters = () => {
    onApply();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="p-2 bg-white hover:bg-white">
          <ListFilter className=" h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[553px]  p-0 border rounded-lg shadow-lg">
        <div className="flex w-full h-full divide-x">
          <div className="w-[224px] p-3 space-y-1 bg-muted/20">
            {(Object.keys(applicationFilterOptions) as ApplicationCategory[]).map((category) => {
              const IconComponent = applicationCategoryIcons[category];
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setSearch('');
                  }}
                  className={clsx(
                    'flex w-full items-center justify-between gap-2 rounded-md p-2 text-left text-sm',
                    active ? 'bg-muted font-semibold' : 'hover:bg-muted',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <IconComponent
                      className={clsx(
                        'w-4 h-4',
                        active ? 'text-yellow-800' : 'text-muted-foreground',
                      )}
                    />
                    {category}
                  </span>
                  {active && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
              );
            })}
          </div>

          <div className="w-[329px]  flex flex-col">
            <div className="flex justify-between items-center px-5 py-4">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Icon className="w-4 h-4 text-yellow-800" />
                {activeCategory}
              </div>
              <button className="text-xs text-muted-foreground cursor-pointer" onClick={selectAll}>
                Select All
              </button>
            </div>

            <div className="flex gap-2 justify-start items-center border-y px-5 py-3">
              <Search size={20} className=" min-h-5 min-w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-5  border-0 outline-0 active:border-0 text-sm"
              />
              <kbd className="text-xs py-[2px] px-[6px] h-5 w-[33px] text-muted-foreground bg-white rounded border">
                ⌘K
              </kbd>
            </div>

            <div className="space-y-2 h-[20] p-2 pr-1 text-sm text-gray-800 flex-1">
              <div className="flex flex-col gap-1">
                {filteredItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateSelection(item)}
                    className={clsx(
                      'flex items-center justify-start gap-2 px-3 py-2 text-gray-900 font-medium hover:bg-muted/40 rounded-md cursor-pointer',
                      selected[activeCategory]?.includes(item as never) && 'bg-muted',
                    )}
                  >
                    <Checkbox
                      id={item}
                      checked={selected[activeCategory]?.includes(item as never) ?? false}
                      className="data-[state=checked]:bg-yellow-800 size-5 data-[state=checked]:border-yellow-800"
                      tabIndex={-1}
                    />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="py-4 border-t px-5 flex  gap-4">
              <Button
                variant="outline"
                className="h-9 w-full  max-w-[136px] text-sm"
                onClick={clearFilters}
              >
                Clear
              </Button>
              <Button className="h-9 w-full max-w-[136px] text-sm " onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
