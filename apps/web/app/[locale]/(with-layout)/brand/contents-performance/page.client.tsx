'use client';

import { useState } from 'react';

import { useFormatter } from 'next-intl';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';

import {
  type CellContext,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import LoadingSvg from 'components/loading/loading-svg';
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
import NavigateColumn from './components/column/navigate-column';
import ReviewProgressStatus from './components/column/review-progress-status-column';
import UploadedDate from './components/column/uploaded-date-column';
import { useContentsPerformance } from './hooks/query';
import { CampaignReview, CreatorWithReviews, type ReviewStatus } from './types';

const getWidthClass = (size: number) => {
  const widthMap: { [key: number]: string } = {
    40: 'w-[40px]',
    88: 'w-[88px]',
    100: 'w-[100px]',
    120: 'w-[120px]',
  };

  return widthMap[size] || `w-[${size}px]`;
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
      const contents = getValue();

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
  {
    id: 'navigate',
    header: '',
    size: 40,
    cell: ({ row }: CellContext<CampaignReview, unknown>) => {
      const { reviewStatus, campaignReviewId, postUrl } = row.original;
      console.log(reviewStatus, campaignReviewId, postUrl);
      return (
        <NavigateColumn
          isActive={
            reviewStatus !== 'NOT_SUBMITTED' && reviewStatus !== 'IN_PROGRESS'
          }
          reviewStatus={reviewStatus}
          campaignReviewId={campaignReviewId}
          postUrl={postUrl}
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
                  key={row.id}
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
  // URL에서 page 쿼리 파라미터 읽기, 없으면 1로 기본값 설정
  const pageFromQuery = searchParams.get('page');
  const [page, setPage] = useState(() => {
    const parsedPage = pageFromQuery ? parseInt(pageFromQuery, 10) : 1;
    return parsedPage > 0 ? parsedPage : 1; // 1 이상의 값만 허용
  });

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
    setPage(1); // 페이지를 1로 리셋
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    setPage(newPage);
    params.set('page', newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const { data, isFetching, isError } = useContentsPerformance(
    campaignIdQueryString || undefined,
    page - 1,
    5,
    !!campaignIdQueryString
  );

  if (isFetching) {
    return (
      <div className="flex h-[52rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }
  if (isError) {
    notFound();
  }
  // const data: ContentsPerformanceApiResponse = {
  //   success: true,
  //   status: 200,
  //   message: '캠페인 크리에이터 성과 리스트 조회에 성공했습니다.',
  //   data: {
  //     campaignId: 63,
  //     campaignTitle: 'ASFDS',
  //     firstContentPlatform: 'INSTA_REELS',
  //     secondContentPlatform: 'TIKTOK_VIDEO',
  //     creators: [
  //       {
  //         creator: {
  //           creatorId: 18,
  //           creatorFullName: '이재훈',
  //           creatorNickname: 'ADF',
  //           profileImageUrl:
  //             'https://lococo-bucket.s3.ap-northeast-2.amazonaws.com/image/myProfile.jpg',
  //         },
  //         reviews: [
  //           {
  //             campaignReviewId: 22,
  //             reviewRound: 'SECOND',
  //             contents: {
  //               contentType: 'INSTA_REELS',
  //               viewCount: 234,
  //               likeCount: 2342,
  //               commentCount: 23423,
  //               shareCount: 2342,
  //             },
  //             reviewStatus: 'FINAL_UPLOADED',
  //             postUrl: 'www.google.com',

  //             uploadedDate: '2025-01-01T00:00:00.000Z',
  //           },
  //           {
  //             campaignReviewId: 21,
  //             reviewRound: 'FIRST',
  //             contents: {
  //               contentType: 'TIKTOK_VIDEO',
  //             },
  //             reviewStatus: 'IN_PROGRESS',
  //             // postUrl: '',

  //             // uploadedDate: '2025-10-02T00:00:00.000Z',
  //           },
  //         ],
  //       },
  //       {
  //         creator: {
  //           creatorId: 22,
  //           creatorFullName: '박성제성제',
  //           creatorNickname: 'ADF',
  //           profileImageUrl:
  //             'https://lococo-bucket.s3.ap-northeast-2.amazonaws.com/image/myProfile.jpg',
  //         },
  //         reviews: [
  //           {
  //             campaignReviewId: 22,
  //             reviewRound: 'SECOND',

  //             reviewStatus: 'FINAL_UPLOADED',
  //             postUrl: 'ADFASFF',
  //             contents: {
  //               contentType: 'INSTA_REELS',
  //               viewCount: 234,
  //               likeCount: 2342,
  //               commentCount: 23423,
  //               shareCount: 2342,
  //             },

  //             uploadedDate: '2025-01-01T00:00:00.000Z',
  //           },
  //           {
  //             campaignReviewId: 23,
  //             reviewRound: 'FIRST',
  //             contents: {
  //               contentType: 'TIKTOK_VIDEO',
  //               viewCount: 234,
  //               likeCount: 2342,
  //               commentCount: 23423,
  //               shareCount: 2342,
  //             },
  //             reviewStatus: 'PENDING_REVISION',
  //             postUrl: '',
  //             uploadedDate: '2025-10-02T00:00:00.000Z',
  //           },
  //         ],
  //       },
  //     ],
  //     pageableResponse: {
  //       pageNumber: 0,
  //       pageSize: 5,
  //       numberOfElements: 1,
  //       isLast: true,
  //       totalPages: 3,
  //     },
  //   },
  // };

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
          disabled={
            campaignIdQueryString === null || data?.data.creators.length === 0
          }
          onClick={() => {
            alert('준비중인 기능입니다.');
          }}
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
      {campaignIdQueryString &&
        data &&
        (data.data.creators.length > 0 ? (
          <>
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
                currentPage={page}
                totalPages={data.data.pageableResponse.totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex h-[38.5rem] flex-col items-center justify-center gap-[3.2rem]">
            <Image
              src="/applicants-empty.svg"
              alt="지원자가 없습니다."
              width={100}
              height={100}
            />
            <p className="text-inter-title2 font-bold text-gray-700">
              지원자가 없습니다.
            </p>
          </div>
        ))}
    </div>
  );
}
