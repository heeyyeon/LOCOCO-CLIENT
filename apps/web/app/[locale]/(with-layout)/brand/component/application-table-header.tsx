export default function ApplicantTableHeader() {
  return (
    <thead className="flex w-[93.6rem] justify-end border-b border-gray-400 py-[0.8rem] pr-[1.6rem]">
      <tr className="flex items-start justify-start gap-[3.2rem] text-left">
        <th className="caption1 w-[14.8rem] text-gray-600">크리에이터</th>
        <th className="caption1 w-[14.8rem] text-gray-600">팔로워 숫자</th>
        <th className="caption1 w-[14.8rem] text-gray-600">참여 캠페인 수</th>
        <th className="caption1 w-[14.8rem] text-gray-600">지원 날짜</th>
        <th className="caption1 w-[5rem] text-gray-600">승인 현황</th>
      </tr>
    </thead>
  );
}
