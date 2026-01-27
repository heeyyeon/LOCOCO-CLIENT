'use client';

import { useState  } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type HeaderGroup,
  type Row,
  type CellContext,
  type Cell,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Button } from '@lococo/design-system/button';
import { Checkbox } from '@lococo/design-system/checkbox';
import { Pagenation } from '@lococo/design-system/pagenation';
import { SvgCheck } from '@lococo/icons';

import { apiRequest } from '../../../web/app/api/apiRequest';
import {
  ApiResponseAdminCampaignListResponse,
  AdminCampaignInfoResponse,
  ApproveCampaignIdsRequest,
} from '../../../web/swagger-codegen/data-contracts';

type CampaignTableData = AdminCampaignInfoResponse;

const createColumns = (
  onApprove: (campaignId: number) => void
): ColumnDef<CampaignTableData>[] => [
  {
    id: 'select',
    size: 50,
    header: '',
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ row }: CellContext<CampaignTableData, unknown>) => {
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            id={`cell-checkbox-${row.id}`}
            checked={row.getIsSelected()}
            disabled={row.original.approvedStatus === 'APPROVED'}
            onCheckedChange={(checked) => {
              if (row.original.approvedStatus === 'PENDING') {
                row.getToggleSelectedHandler()({
                  target: { checked },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'campaignId',
    header: '캠페인 ID',
    size: 120,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<CampaignTableData, number>) => {
      const value = getValue();
      return <div className="text-inter-body1">{value}</div>;
    },
  },
  {
    accessorKey: 'brandName',
    header: '브랜드명',
    size: 150,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<CampaignTableData, string>) => {
      const value = getValue();
      return <div className="text-inter-body1">{value}</div>;
    },
  },
  {
    accessorKey: 'campaignName',
    header: '캠페인명',
    size: 200,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<CampaignTableData, string>) => {
      const value = getValue();
      return <div className="text-inter-body1">{value}</div>;
    },
  },
  {
    accessorKey: 'recruitmentStatus',
    header: '모집 현황',
    meta: {
      style: { textAlign: 'center' },
    },
    size: 150,
    cell: ({
      getValue,
    }: CellContext<CampaignTableData, CampaignTableData['recruitmentStatus']>) => {
      const status = getValue();
      return (
        <div className="text-inter-body1">
          {status.applicantNumber} / {status.recruitmentNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'applyStartDate',
    header: '신청 시작일',
    meta: {
      style: { textAlign: 'center' },
    },
    size: 180,
    cell: ({ getValue }: CellContext<CampaignTableData, string>) => {
      const date = getValue();
      return (
        <div className="text-inter-body1">
          {dayjs(date).format('YYYY-MM-DD HH:mm')}
        </div>
      );
    },
  },
  {
    accessorKey: 'applyDeadline',
    header: '신청 마감일',
    size: 180,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<CampaignTableData, string>) => {
      const date = getValue();
      return (
        <div className="text-inter-body1">
          {dayjs(date).format('YYYY-MM-DD HH:mm')}
        </div>
      );
    },
  },
  {
    accessorKey: 'approvedStatus',
    header: '승인 상태',
    size: 120,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ getValue }: CellContext<CampaignTableData, string>) => {
      const status = getValue();
      return (
        <div
          className={`text-inter-body1 ${
            status === 'APPROVED' ? 'text-green' : 'text-yellow'
          }`}
        >
          {status === 'APPROVED' ? '승인됨' : '대기중'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: '승인',
    size: 120,
    meta: {
      style: { textAlign: 'center' },
    },
    cell: ({ row }: { row: { original: CampaignTableData } }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => onApprove(row.original.campaignId)}
            variant="outline"
            color="primary"
            size="sm"
            rounded="md"
            disabled={row.original.approvedStatus === 'APPROVED'}
          >
            <SvgCheck size={20} />
            <span className="text-[1.4rem]">승인</span>
          </Button>
        </div>
      );
    },
  },
];

async function getAllCampaigns(params: {
  status?: 'PENDING' | 'APPROVED';
  page?: number;
  size?: number;
}) {
  const queryParams: Record<string, string> = {};
  if (params.status) queryParams.status = params.status;
  if (params.page !== undefined) queryParams.page = params.page.toString();
  if (params.size !== undefined) queryParams.size = params.size.toString();

  const response = await apiRequest<ApiResponseAdminCampaignListResponse>({
    endPoint: '/api/admin/campaigns',
    method: 'GET',
    params: queryParams,
  });
  return response;
}

async function approveCampaigns(campaignIds: number[]) {
  const response = await apiRequest<void>({
    endPoint: '/api/admin/campaigns/approval',
    method: 'POST',
    data: { campaignIds } as ApproveCampaignIdsRequest,
  });
  return response;
}

async function deleteCampaigns(campaignIds: number[]) {
  const response = await apiRequest<void>({
    endPoint: '/api/admin/campaigns',
    method: 'DELETE',
    data: { campaignIds } as ApproveCampaignIdsRequest,
  });
  return response;
}

export default function AdminCampaignPage() {
  const searchParams = useSearchParams();
  const statusFromQuery = searchParams.get('status') as
    | 'PENDING'
    | 'APPROVED'
    | null;
  const pageFromQuery = searchParams.get('page');

  const [page, setPage] = useState(() => {
    const parsedPage = pageFromQuery ? parseInt(pageFromQuery, 10) : 0;
    return parsedPage >= 0 ? parsedPage : 0;
  });

  const [selectedStatus, setSelectedStatus] = useState<
    'PENDING' | 'APPROVED' | undefined
  >(statusFromQuery || undefined);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-campaigns', selectedStatus, page],
    queryFn: () =>
      getAllCampaigns({
        status: selectedStatus,
        page,
        size: 10,
      }),
  });

  const approveCampaignsMutation = useMutation({
    mutationFn: (campaignIds: number[]) => approveCampaigns(campaignIds),
    onSuccess: () => {
      alert('캠페인 승인이 완료되었습니다.');
      setRowSelection({});
      refetch();
    },
    onError: (error) => {
      alert(`승인 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    },
  });

  const deleteCampaignsMutation = useMutation({
    mutationFn: (campaignIds: number[]) => deleteCampaigns(campaignIds),
    onSuccess: () => {
      alert('캠페인 삭제가 완료되었습니다.');
      setRowSelection({});
      refetch();
    },
    onError: (error) => {
      alert(`삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    },
  });

  const handleApprove = (campaignId: number) => {
    approveCampaignsMutation.mutate([campaignId]);
  };

  const handleApproveSelected = () => {
    const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => parseInt(key, 10));

    if (selectedIds.length === 0) {
      alert('승인할 캠페인을 선택해주세요.');
      return;
    }

    approveCampaignsMutation.mutate(selectedIds);
  };

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => parseInt(key, 10));

    if (selectedIds.length === 0) {
      alert('삭제할 캠페인을 선택해주세요.');
      return;
    }

    if (!confirm('선택한 캠페인을 삭제하시겠습니까?')) {
      return;
    }

    deleteCampaignsMutation.mutate(selectedIds);
  };

  const handleAllSelectChange = (checked: boolean) => {
    if (!data?.data?.campaigns) return;

    const pendingCampaigns = data.data.campaigns.filter(
      (campaign) => campaign.approvedStatus === 'PENDING'
    );

    if (checked) {
      const newSelection: RowSelectionState = {};
      pendingCampaigns.forEach((campaign: AdminCampaignInfoResponse) => {
        newSelection[campaign.campaignId.toString()] = true;
      });
      setRowSelection(newSelection);
    } else {
      setRowSelection({});
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = createColumns(handleApprove);

  const table = useReactTable({
    data: data?.data?.campaigns || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getRowId: (row: CampaignTableData) => row.campaignId.toString(),
    state: {
      rowSelection,
      columnFilters,
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-inter-title1">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-inter-title1 text-red">에러가 발생했습니다.</div>
      </div>
    );
  }

    const pendingCampaigns =
    data?.data?.campaigns?.filter(
      (campaign: AdminCampaignInfoResponse) => campaign.approvedStatus === 'PENDING'
    ) || [];

  return (
    <div className="flex w-full flex-col gap-[1.6rem] px-[1.6rem] py-[2.4rem]">
      <div className="flex w-full justify-between">
        <h1 className="text-inter-title1 font-bold">캠페인 관리</h1>
        <div className="flex gap-[0.8rem]">
          <Button
            variant={selectedStatus === undefined ? 'filled' : 'outline'}
            color="primary"
            size="sm"
            rounded="md"
            onClick={() => setSelectedStatus(undefined)}
          >
            전체
          </Button>
          <Button
            variant={selectedStatus === 'PENDING' ? 'filled' : 'outline'}
            color="primary"
            size="sm"
            rounded="md"
            onClick={() => setSelectedStatus('PENDING')}
          >
            대기중
          </Button>
          <Button
            variant={selectedStatus === 'APPROVED' ? 'filled' : 'outline'}
            color="primary"
            size="sm"
            rounded="md"
            onClick={() => setSelectedStatus('APPROVED')}
          >
            승인됨
          </Button>
        </div>
      </div>

      {data?.data?.campaigns && data.data.campaigns.length > 0 ? (
        <>
          <div className="sticky top-0 z-10 flex justify-between bg-gray-100 px-[1.6rem] py-[0.8rem]">
            <div className="flex items-center gap-[0.8rem]">
              <Checkbox
                id="all-select"
                checked={
                  Object.keys(rowSelection).length === pendingCampaigns.length &&
                  Object.keys(rowSelection).length > 0
                }
                onCheckedChange={handleAllSelectChange}
              />
              <label
                htmlFor="all-select"
                className="text-inter-body1 cursor-pointer font-bold text-gray-600"
              >
                전체선택하기 (
                {Object.keys(rowSelection).filter(
                  (key) => rowSelection[key]
                ).length || 0}
                / {pendingCampaigns.length})
              </label>
            </div>
            <div className="flex gap-[0.8rem]">
              <Button
                onClick={handleApproveSelected}
                variant="outline"
                color="primary"
                size="sm"
                rounded="md"
                className="grow-0"
                disabled={
                  Object.keys(rowSelection).filter((key) => rowSelection[key])
                    .length === 0 || approveCampaignsMutation.isPending
                }
              >
                <SvgCheck size={20} />
                <span className="text-[1.4rem]">승인하기</span>
              </Button>
              <Button
                onClick={handleDeleteSelected}
                variant="outline"
                color="primary"
                size="sm"
                rounded="md"
                className="grow-0"
                disabled={
                  Object.keys(rowSelection).filter((key) => rowSelection[key])
                    .length === 0 || deleteCampaignsMutation.isPending
                }
              >
                <span className="text-[1.4rem]">삭제하기</span>
              </Button>
            </div>
          </div>

          <div className="relative max-h-[123.5rem]">
            <table className="w-full">
              <thead className="border-b border-gray-400">
                {table.getHeaderGroups().map((hg: HeaderGroup<CampaignTableData>) => (
                  <tr key={hg.id} className="border-b border-gray-400">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="truncate py-[0.8rem] pr-[1.6rem] text-[1.2rem] font-bold text-gray-600"
                        style={{ width: header.getSize() }}
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
                    <td colSpan={columns.length} className="text-center">
                      캠페인이 없습니다.
                    </td>
                  </tr>
                ) : (
                  table.getFilteredRowModel().rows.map((row: Row<CampaignTableData>) => (
                    <tr
                      key={row.original.campaignId}
                      className={`h-[8rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem] ${
                        row.getIsSelected() &&
                        row.original.approvedStatus !== 'APPROVED'
                          ? 'bg-pink-100'
                          : ''
                      }`}
                    >
                      {row.getVisibleCells().map((cell: Cell<CampaignTableData, unknown>) => (
                        <td key={cell.id} className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="my-[6.4rem] flex w-full items-center justify-center">
            <Pagenation
              currentPage={page + 1}
              totalPages={data?.data?.pageInfo?.totalPages || 1}
              handlePageChange={(newPage) => handlePageChange(newPage - 1)}
            />
          </div>
        </>
      ) : (
        <div className="flex h-[60rem] w-full items-center justify-center">
          <div className="text-inter-body1 text-gray-600">
            캠페인이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}

