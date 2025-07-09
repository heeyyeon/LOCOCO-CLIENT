const imageUrl = 'https://via.placeholder.com/264x264.png?text=Product';
export const mockProductSearchResponse = {
  searchQuery: '페이셜케어',
  parentCategoryName: '스킨케어',
  products: [
    {
      productId: 4,
      ranking: 1,
      isLiked: true,
      productName: 'Hydrating Facial Cream',
      brandName: 'BrandA',
      unit: '50ml',
      imageUrls: imageUrl,
      reviewCount: 6,
      rating: 2.5,
    },
    {
      productId: 7,
      ranking: 2,
      isLiked: false,
      productName: 'Soothing Refresh Toner',
      brandName: 'BrandD',
      unit: '200ml',
      imageUrls: imageUrl,
      reviewCount: 3,
      rating: 4.0,
    },
  ],
  pageInfo: {
    pageNumber: 0,
    pageSize: 5,
    numberOfElements: 2,
    isLast: true,
  },
};

export const mockVideoReviewSearchResponse = {
  searchQuery: '페이셜케어',
  parentCategoryName: '스킨케어',
  reviews: [
    {
      reviewId: 101,
      ranking: 1,
      brandName: 'fwee',
      productName: 'fwee リップアンドチーク ブラーリープリンポット',
      likeCount: 0,
      url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTI7re8wwi55xWdUKAilK7xLvOy2A8JcMAPrM-aVZsdDkAMjkjPGwAW8oN_284fCU55fH4ZSv_U3z4yvYdiHytQyr7JztIRBDr5XkXX-v27hA',
    },
    {
      reviewId: 102,
      ranking: 2,
      brandName: 'ブイディーエル',
      productName: 'VDL チークステインチーク',
      likeCount: 0,
      url: 'https://cdn.example.com/reviews/video_review2.mp4',
    },
  ],
  pageInfo: {
    pageNumber: 0,
    pageSize: 2,
    numberOfElements: 2,
    isLast: false,
  },
};
export const mockImageReviewSearchResponse = {
  searchQuery: '페이셜케어',
  parentCategoryName: '스킨케어',
  reviews: [
    {
      reviewId: 113,
      ranking: 1,
      brandName: 'BrandB',
      productName: 'Matte Foundation',
      likeCount: 0,
      url: 'https://cdn.example.com/reviews/image1.jpg',
    },
    {
      reviewId: 114,
      ranking: 2,
      brandName: 'BrandB',
      productName: 'Matte Foundation',
      likeCount: 0,
      url: 'https://cdn.example.com/reviews/image2.jpg',
    },
  ],
  pageInfo: {
    pageNumber: 0,
    pageSize: 2,
    numberOfElements: 2,
    isLast: false,
  },
};
