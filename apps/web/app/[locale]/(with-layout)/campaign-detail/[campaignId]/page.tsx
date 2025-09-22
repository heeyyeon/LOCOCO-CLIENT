import ClientPage from './page.client';

export default function CampaignDetail() {
  const data = {
    campaignId: 1,
    campaignType: 'GIVEAWAY',
    title: '여름 맞이 아이스커피 이벤트',
    brandImageUrl: 'https://example.com/images/brand-coffee.png',
    brandName: 'CoffeeMate',
    language: 'EN',
    applyStartDate: '2025-09-01T00:00:00Z',
    applyDeadline: '2025-09-11T05:59:59Z',
    creatorAnnouncementDate: '2025-09-15T12:00:00Z',
    reviewSubmissionDeadline: '2025-09-30T23:59:59Z',
    deliverableRequirements: ['인스타그램 피드 1개', '리뷰 블로그 글 1개'],
    participationRewards: ['스타벅스 기프트카드 1만원권', '한정판 머그컵'],
    eligibilityRequirements: [
      '팔로워 1000명 이상',
      '커피 관련 콘텐츠 3개 이상',
    ],
    thumbnailImages: [
      {
        id: 101,
        url: '/images/swiper3.png',
        displayOrder: 3,
      },
      {
        id: 101,
        url: '/images/swiper2.png',
        displayOrder: 2,
      },
      {
        id: 101,
        url: '/images/swiper1.png',
        displayOrder: 2,
      },
    ],
    detailImages: [
      {
        id: 201,
        url: 'https://example.com/images/detail-1.png',
        displayOrder: 1,
      },
      {
        id: 202,
        url: 'https://example.com/images/detail-2.png',
        displayOrder: 2,
      },
    ],
    campaignStatusCode: 'Apply Now!',
  };
  return (
    <ClientPage
      title={data.title}
      campaignType={data.campaignType}
      brandName={data.brandName}
      language={data.language}
      applyStartDate={data.applyStartDate}
      applyDeadline={data.applyDeadline}
      creatorAnnouncementDate={data.creatorAnnouncementDate}
      reviewSubmissionDeadline={data.reviewSubmissionDeadline}
      deliverableRequirements={data.deliverableRequirements}
      participationRewards={data.participationRewards}
      eligibilityRequirements={data.eligibilityRequirements}
      thumbnailImages={data.thumbnailImages}
      detailImages={data.detailImages}
      campaignStatusCode={data.campaignStatusCode}
    />
  );
}
