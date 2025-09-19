import Table from './table';

export default function Test() {
  const headers = [
    { label: '크리에이터', width: 'w-[20rem]' },
    { label: '팔로워 수', width: 'w-[15rem]' },
    { label: '상태', width: 'w-[10rem]' },
  ];

  const tableData = [
    [
      <div className="flex items-center gap-[0.8rem]">
        <img
          src="/profile1.jpg"
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <span>Mia Rodriguez</span>
      </div>,
      <span>34.2K</span>,
      <span className="rounded bg-green-100 px-2 py-1">승인</span>,
    ],
    [
      <div className="flex items-center gap-[0.8rem]">
        <img
          src="/profile2.jpg"
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <span>Alex Thompson</span>
      </div>,
      <span>128.5K</span>,
      <span className="rounded bg-yellow-100 px-2 py-1">대기중</span>,
    ],
  ];

  return <Table headers={headers} data={tableData} />;
}
