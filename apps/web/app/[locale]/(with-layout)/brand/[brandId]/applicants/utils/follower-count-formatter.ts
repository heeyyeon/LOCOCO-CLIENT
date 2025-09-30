export const followerCountFormatter = (followerCount: number) => {
  const floorCount = (n: number) => Math.floor(n * 10) / 10;
  if (followerCount >= 1000000) {
    return `${floorCount(followerCount / 1000000).toFixed(1)}M`;
  } else if (followerCount >= 1000) {
    return `${floorCount(followerCount / 1000).toFixed(1)}K`;
  }
  return followerCount.toString();
};
