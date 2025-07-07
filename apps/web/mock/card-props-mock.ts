export const MOCK_CARD_PRODUCT = [
  {
    rank: 1,
    brand: 'SHISEIDO',
    title: '퍼펙트 클렌징 오일',
    description: '메이크업까지 깔끔하게 제거하는 클렌징 오일',
    productId: 1001,
    isLiked: true,
    rating: 4.8,
    reviewCount: 2847,
    likeCount: 1205,
    imageUrl: 'https://picsum.photos/264/264?random=1',
    handleLikeToggle: (productId: number, isLiked: boolean) => {
      console.log(`Product ${productId} like toggled: ${!isLiked}`);
    },
    handleCardClick: (productId: number) => {
      console.log(`Product ${productId} clicked`);
    },
  },
  {
    rank: 2,
    brand: 'LANEIGE',
    title: '워터 슬리핑 마스크',
    description: '밤새 촉촉함을 유지하는 수분 마스크',
    productId: 1002,
    isLiked: false,
    rating: 4.6,
    reviewCount: 1923,
    likeCount: 892,
    imageUrl: 'https://picsum.photos/264/264?random=2',
    handleLikeToggle: (productId: number, isLiked: boolean) => {
      console.log(`Product ${productId} like toggled: ${!isLiked}`);
    },
    handleCardClick: (productId: number) => {
      console.log(`Product ${productId} clicked`);
    },
  },
  {
    rank: 3,
    brand: 'COSRX',
    title: 'AHA/BHA 클래리파잉 트리트먼트 토너',
    description: '각질 제거와 모공 케어를 위한 토너',
    productId: 1003,
    isLiked: true,
    rating: 4.7,
    reviewCount: 3456,
    likeCount: 1567,
    imageUrl: 'https://picsum.photos/264/264?random=3',
    handleLikeToggle: (productId: number, isLiked: boolean) => {
      console.log(`Product ${productId} like toggled: ${!isLiked}`);
    },
    handleCardClick: (productId: number) => {
      console.log(`Product ${productId} clicked`);
    },
  },
  {
    rank: 4,
    brand: 'INNISFREE',
    title: '그린티 씨드 세럼',
    description: '제주 녹차로 만든 진정 세럼',
    productId: 1004,
    isLiked: false,
    rating: 4.4,
    reviewCount: 987,
    likeCount: 423,
    imageUrl: 'https://picsum.photos/264/264?random=4',
    handleLikeToggle: (productId: number, isLiked: boolean) => {
      console.log(`Product ${productId} like toggled: ${!isLiked}`);
    },
    handleCardClick: (productId: number) => {
      console.log(`Product ${productId} clicked`);
    },
  },
  {
    rank: 5,
    brand: 'THE ORDINARY',
    title: '나이아신아마이드 10% + 징크 1%',
    description: '모공과 유분 조절에 도움을 주는 세럼',
    productId: 1005,
    isLiked: true,
    rating: 4.5,
    reviewCount: 5432,
    likeCount: 2134,
    // imageUrl 없음 - placeholder 테스트
    handleLikeToggle: (productId: number, isLiked: boolean) => {
      console.log(`Product ${productId} like toggled: ${!isLiked}`);
    },
    handleCardClick: (productId: number) => {
      console.log(`Product ${productId} clicked`);
    },
  },
];

export const MOCK_CARD_REVIEW = [
  {
    type: 'image' as const,
    rank: 1,
    brand: 'SHISEIDO',
    title: '퍼펙트 클렌징 오일 리뷰',
    reviewId: 2001,
    rating: 5,
    reviewCount: 234,
    likeCount: 1205,
    imageUrl: 'https://picsum.photos/264/264?random=5',
    handleCardClick: (reviewId: number) => {
      console.log(`Review ${reviewId} clicked`);
    },
  },
  {
    type: 'video' as const,
    rank: 2,
    brand: 'LANEIGE',
    title: '워터 슬리핑 마스크 사용 후기',
    reviewId: 2002,
    rating: 4,
    reviewCount: 156,
    likeCount: 892,
    imageUrl: 'https://picsum.photos/264/352?random=6',
    handleCardClick: (reviewId: number) => {
      console.log(`Review ${reviewId} clicked`);
    },
  },
  {
    type: 'image' as const,
    rank: 3,
    brand: 'COSRX',
    title: 'AHA/BHA 토너 3개월 사용기',
    reviewId: 2003,
    likeCount: 567,
    imageUrl: 'https://picsum.photos/264/264?random=7',
    handleCardClick: (reviewId: number) => {
      console.log(`Review ${reviewId} clicked`);
    },
  },
  {
    type: 'video' as const,
    rank: 4,
    brand: 'INNISFREE',
    title: '그린티 씨드 세럼 솔직 리뷰',
    reviewId: 2004,
    likeCount: 423,
    imageUrl: 'https://picsum.photos/264/352?random=8',
    handleCardClick: (reviewId: number) => {
      console.log(`Review ${reviewId} clicked`);
    },
  },
  {
    rank: 5,
    type: 'image' as const,
    brand: 'THE ORDINARY',
    title: '나이아신아마이드 2주 사용 후기',
    reviewId: 2005,
    likeCount: 1134,
    // imageUrl 없음 - placeholder 테스트
    handleCardClick: (reviewId: number) => {
      console.log(`Review ${reviewId} clicked`);
    },
  },
];
