const headers = [
  { label: '크리에이터', width: 'w-[14.8rem]' },
  { label: '팔로워 숫자', width: 'w-[14.8rem]' },
  { label: '참여 캠페인 수', width: 'w-[14.8rem]' },
  { label: '지원 날짜', width: 'w-[14.8rem]' },
  { label: '승인 현황', width: 'w-[5rem]' },
];

export default function ApplicantTableHeader({
  mode,
}: {
  mode: 'recruiting' | 'selected';
}) {
  return (
    <thead className="flex w-[93.6rem] justify-end border-b border-gray-400 py-[0.8rem] pr-[1.6rem]">
      <tr
        className={`${mode === 'selected' && 'mr-[5.4rem]'} flex items-start justify-start gap-[3.2rem] text-left`}
      >
        {headers.map((header, index) => (
          <th key={index} className={`caption1 ${header.width} text-gray-600`}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
