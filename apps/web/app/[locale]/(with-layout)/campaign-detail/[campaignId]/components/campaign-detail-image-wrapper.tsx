import Image from 'next/image';

interface CampaignDetailImageWrapperProps {
  images: string[];
}

export default function CampaignDetailImageWrapper({
  images,
}: CampaignDetailImageWrapperProps) {
  return (
    <div className="mt-[3.2rem] flex w-full flex-col items-center">
      {images.map((image) => (
        <Image
          src={image}
          alt="campaign"
          key={image}
          width={1128}
          height={1000}
          className="h-full object-cover"
        />
      ))}
    </div>
  );
}
