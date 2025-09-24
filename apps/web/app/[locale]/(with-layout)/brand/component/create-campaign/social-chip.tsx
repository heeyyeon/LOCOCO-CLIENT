import React from 'react';

import Image from 'next/image';

type SocialPlatform = 'instagram-post' | 'instagram-reels' | 'tiktok-video';

interface SocialChipConfig {
  icon: string;
  label: string;
  alt: string;
}

const SOCIAL_CONFIGS: Record<SocialPlatform, SocialChipConfig> = {
  'instagram-post': {
    icon: '/instagram.svg',
    label: 'Instagram Post',
    alt: 'instagram post',
  },
  'instagram-reels': {
    icon: '/instagram.svg',
    label: 'Instagram Reels',
    alt: 'instagram reels',
  },
  'tiktok-video': {
    icon: '/tiktok.svg',
    label: 'Tiktok Video',
    alt: 'tiktok video',
  },
} as const;

interface SocialChipProps {
  type: SocialPlatform;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

export default function SocialChip({
  type,
  onClick,
  className = '',
  selected = false,
}: SocialChipProps) {
  const config = SOCIAL_CONFIGS[type];

  return (
    <button
      className={`border-1 flex items-center gap-[0.6rem] rounded-[2.4rem] px-[1.2rem] py-[1rem] ${
        selected ? 'border-pink-500 bg-pink-100' : 'border-gray-400'
      } ${className}`}
      onClick={onClick}
      aria-label={config.label}
    >
      <Image src={config.icon} alt={config.alt} width={20} height={20} />
      <span className={`body1 font-[700] ${selected ? 'text-pink-500' : ''}`}>
        {config.label}
      </span>
    </button>
  );
}
