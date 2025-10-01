'use client';

import { useState } from 'react';

import { useFormatter } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import {
  type CellContext,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { usePathname, useRouter } from 'i18n/navigation';

import { Avatar } from '@lococo/design-system/avatar';
import { Button } from '@lococo/design-system/button';
import { Pagenation } from '@lococo/design-system/pagenation';
import { SvgCalender, SvgDownload } from '@lococo/icons';
import { cn } from '@lococo/utils';

import CampaignSelect from '../applicants/components/campaign-select';
import { koDateRangeFormatter } from '../applicants/utils/ko-date-range-formatter';
import { CampaignInfo } from '../types';
import ContentType from './components/column/content-type-column';
import FollowerCount from './components/column/follower-count-column';
import ReviewProgressStatus from './components/column/review-progress-status-column';
import UploadedDate from './components/column/uploaded-date-column';
import {
  ApiResponse,
  CampaignReview,
  CreatorWithReviews,
  type ReviewStatus,
} from './types';

const getWidthClass = (size: number) => {
  const widthMap: { [key: number]: string } = {
    88: 'w-[88px]',
    100: 'w-[100px]',
    120: 'w-[120px]',
  };

  return widthMap[size] || `w-[${size}px]`;
};

const data: ApiResponse = {
  success: true,
  status: 200,
  message: '캠페인 크리에이터 성과 리스트 조회에 성공했습니다.',
  data: {
    campaignId: 63,
    campaignTitle: 'ASFDS',
    firstContentPlatform: 'INSTA_REELS',
    secondContentPlatform: 'TIKTOK_VIDEO',
    creators: [
      {
        creator: {
          creatorId: 18,
          creatorFullName: '이재훈',
          creatorNickname: 'ADF',
          profileImageUrl:
            'https://lococo-bucket.s3.ap-northeast-2.amazonaws.com/image/myProfile.jpg',
        },
        reviews: [
          {
            campaignReviewId: 22,
            reviewRound: 'SECOND',
            contents: {
              contentType: 'INSTA_REELS',
              viewCount: 234,
              likeCount: 2342,
              commentCount: 23423,
              shareCount: 2342,
            },
            reviewStatus: 'FINAL_UPLOADED',
            postUrl: 'ADFASFF',

            uploadedDate: '2025-01-01T00:00:00.000Z',
          },
          {
            campaignReviewId: 21,
            reviewRound: 'FIRST',
            contents: {
              contentType: 'TIKTOK_VIDEO',
              viewCount: 234,
              likeCount: 2342,
              commentCount: 23423,
              shareCount: 2342,
            },
            reviewStatus: 'PENDING_REVISION',
            postUrl: '',

            uploadedDate: '2025-10-02T00:00:00.000Z',
          },
        ],
      },
      {
        creator: {
          creatorId: 22,
          creatorFullName: '박성제성제',
          creatorNickname: 'ADF',
          profileImageUrl:
            'https://lococo-bucket.s3.ap-northeast-2.amazonaws.com/image/myProfile.jpg',
        },
        reviews: [
          {
            campaignReviewId: 22,
            reviewRound: 'SECOND',

            reviewStatus: 'FINAL_UPLOADED',
            postUrl: 'ADFASFF',
            contents: {
              contentType: 'INSTA_REELS',
              viewCount: 234,
              likeCount: 2342,
              commentCount: 23423,
              shareCount: 2342,
            },

            uploadedDate: '2025-01-01T00:00:00.000Z',
          },
          {
            campaignReviewId: 23,
            reviewRound: 'FIRST',
            contents: {
              contentType: 'TIKTOK_VIDEO',
              viewCount: 234,
              likeCount: 2342,
              commentCount: 23423,
              shareCount: 2342,
            },
            reviewStatus: 'NOT_SUBMITTED',
            postUrl: '',
            uploadedDate: '2025-10-02T00:00:00.000Z',
          },
        ],
      },
    ],
    pageableResponse: {
      pageNumber: 0,
      pageSize: 5,
      numberOfElements: 1,
      isLast: true,
      totalPages: 1,
    },
  },
};

const createColumns = (): ColumnDef<CampaignReview>[] => [
  {
    id: 'contentType',
    accessorKey: 'contents',
    header: '컨텐츠 종류',
    size: 50,
    cell: ({
      getValue,
    }: CellContext<CampaignReview, CampaignReview['contents']>) => {
      const contents = getValue() as CampaignReview['contents'];
      return <ContentType contentType={contents.contentType} />;
    },
  },
  {
    accessorKey: 'reviewStatus',
    header: '상태',
    size: 120,
    cell: ({ getValue }) => {
      const status = getValue() as ReviewStatus;
      return <ReviewProgressStatus reviewStatus={status} />;
    },
  },
  {
    accessorKey: 'uploadedDate',
    header: '업로드 날짜',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 100,
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return <UploadedDate uploadedDate={date} />;
    },
  },
  {
    id: 'viewCount',
    accessorKey: 'contents',
    header: '조회수',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 100,
    cell: ({
      getValue,
    }: CellContext<CampaignReview, CampaignReview['contents']>) => {
      const contents = getValue() as CampaignReview['contents'];
      return (
        <FollowerCount
          contentType={contents.contentType}
          count={contents.viewCount}
        />
      );
    },
  },
  {
    id: 'likeCount',
    accessorKey: 'contents',
    header: '좋아요 수',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 100,
    cell: ({
      getValue,
    }: CellContext<CampaignReview, CampaignReview['contents']>) => {
      const contents = getValue() as CampaignReview['contents'];
      return (
        <FollowerCount
          contentType={contents.contentType}
          count={contents.likeCount}
        />
      );
    },
  },
  {
    id: 'commentCount',
    accessorKey: 'contents',
    header: '댓글 수',
    meta: {
      style: { textAlign: 'left' },
    },
    size: 100,
    cell: ({
      getValue,
    }: CellContext<CampaignReview, CampaignReview['contents']>) => {
      const contents = getValue() as CampaignReview['contents'];
      return (
        <FollowerCount
          contentType={contents.contentType}
          count={contents.commentCount}
        />
      );
    },
  },
  {
    id: 'shareCount',
    accessorKey: 'contents',
    header: '공유 수',
    meta: {
      style: { textAlign: 'left' },
    },

    size: 100,
    cell: ({
      getValue,
    }: CellContext<CampaignReview, CampaignReview['contents']>) => {
      const contents = getValue() as CampaignReview['contents'];
      return (
        <FollowerCount
          contentType={contents.contentType}
          count={contents.shareCount}
        />
      );
    },
  },
];

interface CreatorReviewTableProps {
  creator: CreatorWithReviews;
}

function CreatorReviewTable({ creator }: CreatorReviewTableProps) {
  const columns = createColumns();
  const table = useReactTable({
    data: creator.reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.campaignReviewId.toString(),
  });

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <div className="flex gap-[0.8rem] bg-gray-100 px-[1.6rem] py-[0.8rem]">
        <Avatar src={creator.creator.profileImageUrl} />
        <div className="flex flex-col gap-[0.4rem]">
          <p className="text-inter-body1 font-bold text-gray-800">
            {creator.creator.creatorFullName}
          </p>
          <p className="text-inter-body3 text-gray-600">
            {creator.creator.creatorNickname}
          </p>
        </div>
      </div>

      <div className="relative">
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
            {table.getRowModel().rows.length === 0 ? (
              <tr className="h-[9.6rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]">
                <td colSpan={columns.length} className="text-center">
                  리뷰가 없습니다.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.campaignReviewId}
                  className="h-[9.6rem] w-full border-b border-gray-400 px-[1.6rem] py-[2.4rem]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="">
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
    </div>
  );
}

interface ClientPageProps {
  campaignInfos: CampaignInfo[];
}
export default function ClientPage({ campaignInfos }: ClientPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const format = useFormatter();
  const campaignIdQueryString = searchParams.get('campaignId');

  const [selectedCampaign, setSelectedCampaign] = useState<
    CampaignInfo | undefined
  >(
    campaignInfos.find(
      (campaign) => campaign.campaignId === Number(campaignIdQueryString)
    )
  );

  const handleCampaignChange = (campaignId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const campaign = campaignInfos.find(
      (campaign) => campaign.campaignId.toString() === campaignId
    );

    setSelectedCampaign(campaign);
    params.set('campaignId', campaignId);
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-col gap-[1.6rem] px-[1.6rem]">
      <div className="flex w-full justify-between">
        <CampaignSelect
          campaignInfos={campaignInfos}
          selectedCampaign={selectedCampaign}
          handleCampaignChange={handleCampaignChange}
        />
        <Button
          variant="outline"
          color="primary"
          size="sm"
          rounded="sm"
          className="grow-0"
          disabled={campaignIdQueryString === null}
        >
          <SvgDownload />
          Export
        </Button>
      </div>
      <div className="flex flex-col gap-[3.2rem]">
        <div className="flex justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <SvgCalender className="size-[2rem] text-gray-600" />
            <p className="text-inter-body3 text-gray-600">
              {selectedCampaign?.startDate && selectedCampaign?.endDate
                ? koDateRangeFormatter(
                    selectedCampaign.startDate,
                    selectedCampaign.endDate,
                    format
                  )
                : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[4.8rem]">
        {data.data.creators.map((creator) => (
          <CreatorReviewTable
            key={creator.creator.creatorId}
            creator={creator}
          />
        ))}
      </div>
      <div className="my-[6.4rem] flex w-full items-center justify-center">
        <Pagenation
          currentPage={data.data.pageableResponse.pageNumber}
          totalPages={data.data.pageableResponse.totalPages}
          handlePageChange={() => {
            //
          }}
        />
      </div>
    </div>
  );
}
