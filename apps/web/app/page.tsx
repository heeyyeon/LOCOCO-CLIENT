'use client';

import HomeSection from 'components/home/home';

export default function Main() {
  return (
    <main className="flex min-h-screen w-screen justify-center">
      <article className="flex w-[112.8rem] flex-col">
        <div className="text-jp-body2 mt-[4rem] flex w-full items-baseline justify-end font-[500] text-gray-600">
          更新日時 :<span className="text-en-body1">2025</span>年
          <span className="text-en-body1">06</span>月
          <span className="text-en-body1">30</span>日
        </div>
        <HomeSection className="mt-[6rem]">
          <HomeSection.Header title="제목" />
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header title="제목2" />
          <HomeSection.Product />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header title="좋아요가 많은 리뷰" />
          <HomeSection.Review type="video" />
          <HomeSection.Review type="image" className="mt-[4.8rem]" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header title="인기있는 K-뷰티 YouTube 영상" />
          <HomeSection.YouTube />
        </HomeSection>
      </article>
    </main>
  );
}
