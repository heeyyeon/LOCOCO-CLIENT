export default function CampaignCountColumn({
  campaignCount,
}: {
  campaignCount: number;
}) {
  return (
    <div>
      <p className="text-inter-body3 text-gray-800">{campaignCount}</p>
    </div>
  );
}
