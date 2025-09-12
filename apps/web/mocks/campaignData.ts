interface CampaignData {
  dueDate: string;
  chipVariant: 'expired' | 'active';
  brand: string;
  title: string;
  label: string;
  maxApplicants: number;
  currentApplicants: number;
  productThumbnailSrc: string;
  campaignId: number;
}

// 화장품 더미 이미지 URLs
const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=360&h=216&fit=crop&q=80', // 립스틱들
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=360&h=216&fit=crop&q=80', // 화장품 브러쉬
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=360&h=216&fit=crop&q=80', // 파운데이션 보틀
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=360&h=216&fit=crop&q=80', // 아이섀도우 팔레트
  'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=360&h=216&fit=crop&q=80', // 스킨케어 크림
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=360&h=216&fit=crop&q=80', // 향수 병
  'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=360&h=216&fit=crop&q=80', // 마스크팩
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=360&h=216&fit=crop&q=80', // 세럼 보틀
];

// 화장품 캠페인 더미 데이터
export const campaignDummyData: CampaignData[] = [
  {
    dueDate: '2025-09-30',
    chipVariant: 'active',
    brand: 'Dior',
    title: '루즈 디올 립스틱 컬러 체험단',
    label: '립메이크업',
    maxApplicants: 80,
    currentApplicants: 34,
    productThumbnailSrc: DUMMY_IMAGES[0],
    campaignId: 2001,
  },
  {
    dueDate: '2025-08-15',
    chipVariant: 'expired',
    brand: 'Chanel',
    title: '샤넬 No.5 퍼퓸 체험단 모집',
    label: '향수',
    maxApplicants: 50,
    currentApplicants: 50,
    productThumbnailSrc: DUMMY_IMAGES[5],
    campaignId: 2002,
  },
  {
    dueDate: '2025-10-15',
    chipVariant: 'active',
    brand: 'Estée Lauder',
    title: '더블 웨어 파운데이션 리뷰어',
    label: '베이스메이크업',
    maxApplicants: 100,
    currentApplicants: 67,
    productThumbnailSrc: DUMMY_IMAGES[2],
    campaignId: 2003,
  },
  {
    dueDate: '2025-09-20',
    chipVariant: 'active',
    brand: 'Urban Decay',
    title: '네이키드 아이섀도우 팔레트 체험단',
    label: '아이메이크업',
    maxApplicants: 60,
    currentApplicants: 28,
    productThumbnailSrc: DUMMY_IMAGES[3],
    campaignId: 2004,
  },
  {
    dueDate: '2025-07-30',
    chipVariant: 'expired',
    brand: 'La Mer',
    title: '라 메르 크림 드 라 메르 체험단',
    label: '스킨케어',
    maxApplicants: 30,
    currentApplicants: 30,
    productThumbnailSrc: DUMMY_IMAGES[4],
    campaignId: 2005,
  },
  {
    dueDate: '2025-11-01',
    chipVariant: 'active',
    brand: 'SK-II',
    title: 'SK-II 페이셜 트리트먼트 에센스 리뷰어',
    label: '스킨케어',
    maxApplicants: 40,
    currentApplicants: 15,
    productThumbnailSrc: DUMMY_IMAGES[7],
    campaignId: 2006,
  },
  // {
  //   dueDate: '2025-09-25',
  //   chipVariant: 'active',
  //   brand: 'Laneige',
  //   title: '라네즈 워터 슬리핑 마스크 체험단',
  //   label: '마스크팩',
  //   maxApplicants: 120,
  //   currentApplicants: 89,
  //   productThumbnailSrc: DUMMY_IMAGES[6],
  //   campaignId: 2007,
  // },
  // {
  //   dueDate: '2025-10-10',
  //   chipVariant: 'active',
  //   brand: 'Charlotte Tilbury',
  //   title: '필로우 토크 립스틱 컬렉션 체험단',
  //   label: '립메이크업',
  //   maxApplicants: 70,
  //   currentApplicants: 42,
  //   productThumbnailSrc: DUMMY_IMAGES[1],
  //   campaignId: 2008,
  // },
];
