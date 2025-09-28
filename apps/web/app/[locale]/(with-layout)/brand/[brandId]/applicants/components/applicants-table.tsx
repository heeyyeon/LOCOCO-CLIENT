import React from 'react';

import {
  type CellContext,
  type ColumnDef,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
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
    creatorCampaignId: 1,
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
    creatorCampaignId: 2,
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
    creatorCampaignId: 3,
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
}

export default function ApplicantsTable({
  rowSelection,
  onRowSelectionChange,
  onDataLengthChange,
}: ApplicantsTableProps) {
  const columns = createColumns();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange,
    state: {
      rowSelection,
    },
  });

  // 실제 데이터 길이를 부모에게 전달
  React.useEffect(() => {
    onDataLengthChange?.(data.length);
  }, [onDataLengthChange]);

  return (
    <div className="relative h-[60rem]">
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
          {data.length === 0 && (
            <tr className="h-[60rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]">
              <td colSpan={5} className="text-center">
                지원자가 없습니다.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
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
