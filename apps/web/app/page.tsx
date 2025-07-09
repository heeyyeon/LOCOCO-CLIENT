'use client';

import HomeSection from 'components/home/home';

export default function Main() {
  return (
    <main className="min-h-[100vh] w-screen px-[11.9rem]">
      <article className="flex w-full flex-col">
        <div>날짜</div>
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
          <HomeSection.Review type="image" className="mt-12" />
        </HomeSection>
        <HomeSection>
          <HomeSection.Header title="인기있는 K-뷰티 YouTube 영상" />
        </HomeSection>
      </article>
    </main>
  );
}
