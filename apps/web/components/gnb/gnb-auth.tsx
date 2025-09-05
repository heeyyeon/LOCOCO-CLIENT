'use client';

import { useAuth } from 'hooks/use-auth';

import { SvgProfileIcon } from '@lococo/icons';

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
      {!isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="relative">
            <button className="flex h-[5.6rem] items-center gap-[1rem] px-[1rem] py-[1.6rem] text-black">
              <SvgProfileIcon size={20} />
              <span>유저이름</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="mt-[0.4rem] w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuItem>My Page</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
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
