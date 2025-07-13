import { SearchIcon, CircleXIcon } from 'lucide-react';
import { useId, useRef, useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { cn } from '~/lib/utils';
import type { Table } from '@tanstack/react-table';
import { useDebounce } from '~/hooks/use-debaunce';

interface TableFilterProps<T> {
  table: Table<T>;
  onSearch: (value: string) => void;
}

function TableFilter<T>({ onSearch }: TableFilterProps<T>) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500); // debounce 500ms

  useEffect(() => {
    onSearch(debouncedSearch); // send debounced value to parent
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 max-w-[calc(var(--spacing)*75)] w-full">
      <div className="flex items-center gap-3 w-full">
        <div className="relative w-full">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn('peer min-w-60 ps-9', searchValue && 'pe-9')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            type="text"
            aria-label="Global search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
            <SearchIcon size={16} />
          </div>
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue('');
                inputRef.current?.focus();
              }}
              className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Clear search"
            >
              <CircleXIcon size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
