import {
  type CellContext,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Checkbox } from '@lococo/design-system/checkbox';
import { cn } from '@lococo/utils';

import { ApplicantData, ApproveStatus } from '../types';
import AppliedDateColumn from './column/applied-date-column';
import ApproveStatusColumn from './column/approve-status-column';
import CampaignCountColumn from './column/campaign-count-column';
import CreatorProfileColumn from './column/creator-profile-column';
import FollowerCountColumn from './column/follower-count-column';

const getWidthClass = (size: number) => {
  const widthMap: { [key: number]: string } = {
    50: 'w-[50px]',
    120: 'w-[120px]',
    148: 'w-[148px]',
    244: 'w-[244px]',
  };

  return widthMap[size] || `w-[${size}px]`;
};

const createColumns = (): ColumnDef<ApplicantData>[] => [
  {
    id: 'select',
    size: 50,
    meta: {
      style: { textAlign: 'left' },
    },
    cell: ({ row }: { row: Row<ApplicantData> }) => {
      return (
        <>
          <div className="flex items-center justify-center">
            <Checkbox
              id={`cell-checkbox-${row.id}`}
              checked={
                row.getIsSelected() || row.original.approveStatus === 'APPROVED'
              }
              disabled={
                !row.getCanSelect() || row.original.approveStatus === 'APPROVED'
              }
              onCheckedChange={(checked) => {
                if (row.original.approveStatus !== 'APPROVED') {
                  row.getToggleSelectedHandler()({
                    target: { checked },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
            />
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'creator',
    header: '크리에이터',
    size: 244, // 컬럼 너비 설정
    cell: ({
      getValue,
    }: CellContext<ApplicantData, ApplicantData['creator']>) => {
      const row = getValue();
      return (
        <CreatorProfileColumn
          creatorProfileImageUrl={row.creatorProfileImageUrl}
          creatorFullName={row.creatorFullName}
          creatorNickName={row.creatorNickName}
        />
      );
    },
  },
  {
    accessorKey: 'followerCount',
    header: '팔로워 숫자',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 148,
    cell: ({
      getValue,
    }: CellContext<ApplicantData, ApplicantData['followerCount']>) => {
      const row = getValue();
      return (
        <FollowerCountColumn
          instagramFollower={row.instagramFollower}
          tiktokFollower={row.tiktokFollower}
        />
      );
    },
  },
  {
    accessorKey: 'participationCount',
    header: '참여 캠페인 수',
    size: 148,
    meta: {
      style: { textAlign: 'left' },
    },
    cell: ({ getValue }: CellContext<ApplicantData, number>) => {
      const row = getValue();
      return <CampaignCountColumn campaignCount={row} />;
    },
  },
  {
    accessorKey: 'appliedDate',
    header: '지원 날짜(한국기준)',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 148,
    cell: ({ getValue }: CellContext<ApplicantData, string>) => {
      const row = getValue();
      return <AppliedDateColumn appliedDate={row} />;
    },
  },
  {
    accessorKey: 'approveStatus',
    header: '승인 현황',
    size: 50,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<ApplicantData, ApproveStatus>) => {
      const row = getValue();
      return <ApproveStatusColumn approvalStatus={row} />;
    },
  },
];

interface ApplicantsTableProps {
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  data: ApplicantData[];
}

export default function ApplicantsTable({
  rowSelection,
  onRowSelectionChange,
  columnFilters,
  onColumnFiltersChange,
  data,
}: ApplicantsTableProps) {
  const columns = createColumns();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange,
    onColumnFiltersChange,
    getRowId: (row) => row.creatorCampaignId.toString(),
    state: {
      rowSelection,
      columnFilters,
    },
  });

  return (
    <div className="relative max-h-[123.5rem]">
      <table className="w-full">
        <thead className="border-b border-gray-400">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-gray-400">
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  style={
                    (
                      header.column.columnDef.meta as {
                        style?: React.CSSProperties;
                      }
                    )?.style
                  }
                  className={cn(
                    `${getWidthClass(header.getSize())}`,
                    `truncate py-[0.8rem] pr-[1.6rem] text-[1.2rem] font-bold text-gray-600`
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tr className="h-[60rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]">
              <td colSpan={5} className="text-center">
                지원자가 없습니다.
              </td>
            </tr>
          ) : (
            table.getFilteredRowModel().rows.map((row) => (
              <tr
                key={row.original.creatorCampaignId}
                className={cn(
                  'h-[12rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]',
                  row.getIsSelected() &&
                    row.original.approveStatus !== 'APPROVED' &&
                    'bg-pink-100'
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
