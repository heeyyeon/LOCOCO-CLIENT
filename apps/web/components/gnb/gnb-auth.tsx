import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function GnbAuth() {
  return (
    <div className="flex h-[5.6rem] items-center gap-4">
      <button>Log in</button>
      <button>Sign up</button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded bg-blue-500 px-4 py-2 text-black">
            드롭다운 테스트{' '}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>1</DropdownMenuItem>
          <DropdownMenuItem>2</DropdownMenuItem>
          <DropdownMenuItem>3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
