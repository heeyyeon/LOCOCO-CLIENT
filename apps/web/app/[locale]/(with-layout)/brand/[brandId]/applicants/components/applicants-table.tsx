import React from 'react';

import {
  type CellContext,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Checkbox } from '@lococo/design-system/checkbox';
import { cn } from '@lococo/utils';

import AppliedDateColumn from './column/applied-date-column';
import ApproveStatusColumn from './column/approve-status-column';
import CampaignCountColumn from './column/campaign-count-column';
import CreatorProfileColumn from './column/creator-profile-column';
import FollowerCountColumn from './column/follower-count-column';

type ApproveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
interface ApplicantData {
  creatorCampaignId: number;
  creatorId: number;
  creator: {
    creatorFullName: string;
    creatorNickName: string;
    creatorProfileImageUrl: string;
  };
  followerCount: {
    instagramFollower: number;
    tiktokFollower: number;
  };
  participationCount: number;
  appliedDate: string;
  approveStatus: ApproveStatus;
}

const data: ApplicantData[] = [
  {
    creatorCampaignId: 1412,
    creatorId: 3845,

    creator: {
      creatorFullName: 'James Rodriguez',
      creatorNickName: 'echandler',
      creatorProfileImageUrl: '/images/swiper1.png',
    },
    followerCount: {
      instagramFollower: 3859,
      tiktokFollower: 110089,
    },
    participationCount: 10,
    appliedDate: '2025-09-27T12:45:01.455391',
    approveStatus: 'APPROVED',
  },

  {
    creatorCampaignId: 999,
    creatorId: 213,

    creator: {
      creatorFullName: '도레미',
      creatorNickName: '999',
      creatorProfileImageUrl: '/images/swiper4.png',
    },
    followerCount: {
      instagramFollower: 3859,
      tiktokFollower: 110089,
    },
    participationCount: 10,
    appliedDate: '2025-09-27T12:45:01.455391',
    approveStatus: 'APPROVED',
  },
  {
    creatorCampaignId: 312,
    creatorId: 6804,

    creator: {
      creatorFullName: 'Ian Nelson',
      creatorNickName: 'thomasschultz',
      creatorProfileImageUrl: '/images/swiper2.png',
    },

    followerCount: {
      instagramFollower: 45306,
      tiktokFollower: 60255,
    },

    participationCount: 6,
    appliedDate: '2025-06-28T12:45:01.455788',
    approveStatus: 'PENDING',
  },
  {
    creatorCampaignId: 12,
    creatorId: 1576,
    creator: {
      creatorFullName: 'Ashley Miranda',
      creatorNickName: 'patricia53',
      creatorProfileImageUrl: '',
    },
    followerCount: {
      instagramFollower: 68516,
      tiktokFollower: 24896,
    },
    participationCount: 8,
    appliedDate: '2025-08-24T12:45:01.456041',
    approveStatus: 'REJECTED',
  },
  {
    creatorCampaignId: 567,
    creatorId: 2341,
    creator: {
      creatorFullName: '김민수',
      creatorNickName: 'minsu_kim',
      creatorProfileImageUrl: '/images/swiper3.png',
    },
    followerCount: {
      instagramFollower: 125000,
      tiktokFollower: 89000,
    },
    participationCount: 15,
    appliedDate: '2025-09-15T09:30:15.123456',
    approveStatus: 'APPROVED',
  },
  {
    creatorCampaignId: 789,
    creatorId: 4567,
    creator: {
      creatorFullName: 'Sarah Johnson',
      creatorNickName: 'sarah_beauty',
      creatorProfileImageUrl: '/images/swiper5.png',
    },
    followerCount: {
      instagramFollower: 250000,
      tiktokFollower: 180000,
    },
    participationCount: 12,
    appliedDate: '2025-09-20T14:22:30.789012',
    approveStatus: 'PENDING',
  },
  {
    creatorCampaignId: 234,
    creatorId: 7890,
    creator: {
      creatorFullName: '이지은',
      creatorNickName: 'jieun_life',
      creatorProfileImageUrl: '/images/swiper6.png',
    },
    followerCount: {
      instagramFollower: 45000,
      tiktokFollower: 32000,
    },
    participationCount: 7,
    appliedDate: '2025-09-10T16:45:22.345678',
    approveStatus: 'REJECTED',
  },
  {
    creatorCampaignId: 456,
    creatorId: 1234,
    creator: {
      creatorFullName: 'Michael Chen',
      creatorNickName: 'mike_tech',
      creatorProfileImageUrl: '',
    },
    followerCount: {
      instagramFollower: 180000,
      tiktokFollower: 220000,
    },
    participationCount: 20,
    appliedDate: '2025-09-25T11:15:45.567890',
    approveStatus: 'APPROVED',
  },
  {
    creatorCampaignId: 678,
    creatorId: 5678,
    creator: {
      creatorFullName: '박서연',
      creatorNickName: 'seoyeon_fashion',
      creatorProfileImageUrl: '',
    },
    followerCount: {
      instagramFollower: 320000,
      tiktokFollower: 280000,
    },
    participationCount: 18,
    appliedDate: '2025-09-28T13:30:10.234567',
    approveStatus: 'PENDING',
  },
  {
    creatorCampaignId: 890,
    creatorId: 9012,
    creator: {
      creatorFullName: 'David Wilson',
      creatorNickName: 'david_fitness',
      creatorProfileImageUrl: '',
    },
    followerCount: {
      instagramFollower: 95000,
      tiktokFollower: 75000,
    },
    participationCount: 9,
    appliedDate: '2025-09-12T08:20:35.890123',
    approveStatus: 'REJECTED',
  },
];

const getWidthClass = (size: number) => {
  const widthMap: { [key: number]: string } = {
    40: 'w-[30px]',
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
    // TODO: 최종 UI 확정 후 삭제
    // header: ({ table }: { table: Table<ApplicantData> }) => (
    //   <Checkbox
    //     id="header-checkbox"
    //     checked={table.getIsAllRowsSelected()}
    //     onCheckedChange={(checked) => {
    //       if (checked) {
    //         table.getToggleAllRowsSelectedHandler()({
    //           target: { checked: true },
    //         } as React.ChangeEvent<HTMLInputElement>);
    //       } else {
    //         table.getToggleAllRowsSelectedHandler()({
    //           target: { checked: false },
    //         } as React.ChangeEvent<HTMLInputElement>);
    //       }
    //     }}
    //   />
    // ),
    cell: ({ row }: { row: Row<ApplicantData> }) => (
      <Checkbox
        id={`cell-checkbox-${row.id}`}
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => {
          row.getToggleSelectedHandler()({
            target: { checked },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      />
    ),
  },
  {
    accessorKey: 'creator',
    header: '크리에이터',
    size: 244, // 컬럼 너비 설정
    cell: ({
      getValue,
    }: CellContext<ApplicantData, ApplicantData['creator']>) => {
      const row = getValue();
      return CreatorProfileColumn({
        creatorProfileImageUrl: row.creatorProfileImageUrl,
        creatorFullName: row.creatorFullName,
        creatorNickName: row.creatorNickName,
      });
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
      return FollowerCountColumn({
        instagramFollower: row.instagramFollower,
        tiktokFollower: row.tiktokFollower,
      });
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
      return CampaignCountColumn({ campaignCount: row });
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
      return AppliedDateColumn({ appliedDate: row });
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
      return ApproveStatusColumn({ approvalStatus: row });
    },
  },
];

interface ApplicantsTableProps {
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onDataLengthChange?: (length: number) => void;
  onFilteredRowIdsChange?: (rowIds: string[]) => void;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
}

export default function ApplicantsTable({
  rowSelection,
  onRowSelectionChange,
  onDataLengthChange,
  onFilteredRowIdsChange,
  columnFilters,
  onColumnFiltersChange,
}: ApplicantsTableProps) {
  const columns = createColumns();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange,
    onColumnFiltersChange,
    getRowId: (row) => row.creatorCampaignId.toString(),
    state: {
      rowSelection,
      columnFilters,
    },
  });

  // 필터링된 데이터 길이와 row ID들을 부모에게 전달
  React.useEffect(() => {
    const filteredRows = table.getFilteredRowModel().rows;
    const filteredRowIds = filteredRows.map((row) => row.id);

    onDataLengthChange?.(filteredRows.length);
    onFilteredRowIdsChange?.(filteredRowIds);
  }, [table, columnFilters, onDataLengthChange, onFilteredRowIdsChange]);

  return (
    <div className="relative h-[123.5rem]">
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
          {table.getFilteredRowModel().rows.length === 0 && (
            <tr className="h-[60rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]">
              <td colSpan={5} className="text-center">
                지원자가 없습니다.
              </td>
            </tr>
          )}
          {table.getFilteredRowModel().rows.map((row) => (
            <tr
              key={row.original.creatorCampaignId}
              className="h-[12rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
