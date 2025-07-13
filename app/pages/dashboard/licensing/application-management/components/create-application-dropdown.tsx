import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { FileIcon } from '~/assets/icons';
import { Button } from '~/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useGetApplicationType } from '../hooks/use-get-application-type';
import { applicationTypeConfig } from '../helper/application-type-config';
import { cn } from '~/lib/utils';
import { useAuth } from '~/providers/AuthProvider';

export function CreateNewApplicationDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: applicationTypesResponse, isLoading } = useGetApplicationType();
  const { user } = useAuth();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* only licensing user can create application */}
      {user?.role_ids?.includes(7) && (
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="p-2 text-[14px] flex items-center gap-2">
            Create New Application
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                open ? 'rotate-90' : 'rotate-0'
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent className="w-[252px] rounded-xl shadow-lg p-2 mr-9.25">
        {isLoading ? (
          <DropdownMenuItem className="text-sm text-muted">Loading...</DropdownMenuItem>
        ) : (
          applicationTypesResponse?.data?.map((type, index, arr) => {
            const config = applicationTypeConfig[type.name] || {};
            const isLast = index === arr.length - 1;

            return (
              <DropdownMenuItem
                key={type.name}
                className={cn('text-[14px] py-4 justify-between', !isLast && 'border-b')}
                onClick={() => {
                  if (config.route) {
                    navigate(config.route);
                  } else {
                    alert('This application type is not yet supported.');
                  }
                }}
              >
                <div className="flex gap-1.5 items-center">
                  {config.icon || <FileIcon svgProps={{ className: 'size-5' }} />}
                  <span className="text-[15px]">{type.name}</span>
                </div>
                <ChevronRight />
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
