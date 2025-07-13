import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

const Module_OPTIONS = ['System', 'Authentication', 'Data Management'];

export function ModuleFilterDropdown({
  selectedModules,
  setSelectedModules,
}: {
  selectedModules: string[];
  setSelectedModules: (modules: string[]) => void;
}) {
  const handleModules = (value: string) => {
    setSelectedModules([value]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="py-1.75 px-2.5 bg-white font-normal text-[#444955]">
          Module <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 min-w-[300px] rounded-xl shadow-xl border border-border space-y-1 relative w-full left-auto right-[100px]">
        <RadioGroup value={selectedModules[0]} onValueChange={handleModules}>
          {Module_OPTIONS.map((module) => (
            <DropdownMenuItem
              onSelect={() => handleModules(module)}
              key={module}
              className="flex items-center justify-between px-3 py-2 text-gray-900 font-medium hover:bg-muted/40 rounded-md cursor-pointer"
            >
              <span>{module}</span>
              <RadioGroupItem
                value={module}
                checked={selectedModules[0] === module}
                className="data-[state=checked]:bg-red-900 size-5  data-[state=checked]:border-yellow-800 data-[state=checked]:after:bg-white"
              />
            </DropdownMenuItem>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
