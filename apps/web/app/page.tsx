'use client';

import HomeSection from 'components/home/home';

export default function Main() {
  return (
    <main className="min-h-[100vh] w-screen px-[11.9rem]">
      <article className="flex w-full flex-col">
        <div>날짜</div>
        <HomeSection>
          <HomeSection.Header title="제목" />
          <HomeSection.Content />
        </HomeSection>
      </article>
    </main>
  );
}
