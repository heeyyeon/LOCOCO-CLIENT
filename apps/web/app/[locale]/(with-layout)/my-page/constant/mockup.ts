export const mockup = {
  profile: {
    profileImage: '',
    name: 'Jessica Anderson',
    email: 'jessica Anderso@gmail.com',
    instagram: '@beautycoach',
    level: 'Pro',
  },
};

export const mockupCampaign = [
  // 1. 캠페인 승인 전
  {
    title: 'K-Beauty Skincare Campaign',
    chipText: 'Not Open',
    status: 'not_open',
    deadline: '2025-01-15',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 2. 캠페인 지원 후 결과 대기 중
  {
    title: 'Premium Hair Care Review',
    chipText: 'Pending',
    status: 'pending',
    deadline: '2025-01-20',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 3. 캠페인 당첨
  {
    title: 'Luxury Makeup Collection',
    chipText: 'Approved',
    status: 'approved',
    deadline: '2025-01-25',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 4. 캠페인 당첨 O, 배송지 확인 후
  {
    title: 'Natural Skincare Set',
    chipText: 'Active',
    status: 'active',
    deadline: '2025-01-30',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 5. 캠페인 당첨 O, 1차 리뷰 업로드 완료
  {
    title: 'Anti-Aging Serum',
    chipText: 'Active',
    status: 'active_review_uploaded',
    deadline: '2025-02-05',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 6. 캠페인 당첨 O, 브랜드 수정사항 남김
  {
    title: 'Vitamin C Brightening',
    chipText: 'Active',
    status: 'active_revision_requested',
    deadline: '2025-02-10',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 7. 캠페인 당첨 O, 브랜드 수정사항 확인 후
  {
    title: 'Hydrating Face Mask',
    chipText: 'Active',
    status: 'active_revision_confirmed',
    deadline: '2025-02-15',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 8. 캠페인 당첨 O, 2차 리뷰 업로드 완료
  {
    title: 'Gentle Cleansing Foam',
    chipText: 'Completed',
    status: 'completed',
    deadline: '2025-02-20',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 9. 캠페인 당첨 O, 배송지 확인 X
  {
    title: 'Moisturizing Lotion',
    chipText: 'Expired',
    status: 'expired_address',
    deadline: '2025-02-25',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 10. 캠페인 당첨 O, 리뷰 업로드 X
  {
    title: 'Sunscreen Protection',
    chipText: 'Expired',
    status: 'expired_review',
    deadline: '2025-03-01',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
  // 11. 캠페인 당첨 X
  {
    title: 'Organic Face Oil',
    chipText: 'Rejected',
    status: 'rejected',
    deadline: '2025-03-05',
    handleButtonClick: () => {},
    imageSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAA1BMVEUAAACnej3aAAAALElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgZViQAAd2fpbUAAAAASUVORK5CYII=',
  },
];
