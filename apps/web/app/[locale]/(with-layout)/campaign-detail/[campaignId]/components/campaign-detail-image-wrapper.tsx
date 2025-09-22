import Image from 'next/image';

export default function CampaignDetailImageWrapper() {
  // TODO: api 연동 후 이미지 교체
  const defaultImages = ['/images/swiper1.png', '/images/swiper6.png'];

  return (
    <div className="mt-[3.2rem] flex w-full flex-col items-center gap-[1rem]">
      {defaultImages.map((image) => (
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
