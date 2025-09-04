'use client';

import { useAuth } from 'hooks/use-auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function GnbAuth() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex h-[5.6rem] items-center gap-4">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded bg-blue-500 px-4 py-2 text-black">
              유저이름
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>1</DropdownMenuItem>
            <DropdownMenuItem>2</DropdownMenuItem>
            <DropdownMenuItem>3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <button className="px-[1.6rem] py-[1rem]">Log in</button>
          <button className="px-[1.6rem] py-[1rem] text-pink-500">
            Sign up
          </button>
        </>
      )}
    </div>
  );
}
