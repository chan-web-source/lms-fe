import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import userImg from '~/assets/images/user-img.png';
import { ScrollArea } from '~/components/ui/scroll-area';

type User = {
  id: string;
  first_name: string;
  surname: string;
  avatar: string;
};

export function UserFilterDropdown({
  allUsers,
  selectedUsers,
  setSelectedUsers,
}: {
  allUsers: User[];
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
}) {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) =>
      `${u.first_name || ''} ${u.surname || ''}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [allUsers, search]);

  const toggleUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="py-1.75 px-2.5 bg-white font-normal text-[#444955]">
          User <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[280px] font-normal text-gray-900 rounded-xl shadow-xl p-2 border z-50 relative w-full right-[100px]">
        <div className="flex items-center gap-1 px-2 pb-2 border-b border-border">
          <Search size={15} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-5 w-full border-0 outline-0 text-gray-900 bg-transparent placeholder:text-gray-400"
          />
        </div>

        <ScrollArea className="h-[200px]">
          <div className="pr-1">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/40 cursor-pointer"
                onClick={() => toggleUser(user.id)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={userImg} alt={user.first_name} />
                    <AvatarFallback className="uppercase text-[10px]">
                      {(user.first_name || 'U').substring(0, 1)}
                      {(user.surname || '').substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-strong font-normal">
                    {user.first_name} {user.surname}
                  </span>
                </div>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  className="data-[state=checked]:bg-[#994A00] text-white data-[state=checked]:border-[#5E2C04]"
                />
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">No users found</div>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
