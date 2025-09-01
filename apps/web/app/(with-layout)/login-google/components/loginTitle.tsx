export default function LoginTitle({
  mode = 'login',
}: {
  mode?: 'login' | 'signup';
}) {
  return (
    <>
      {/* TODO: 폰트 스타일 추가 */}
      <h1 className="mb-[1.6rem] text-pink-500">Welcome to Lococo!</h1>
      <div className="text-center text-gray-800">
        {mode === 'login' ? (
          <p>Log in to your Google account right away</p>
        ) : (
          <>
            <p>
              After signing up with Google, you can choose to join as a Creator,
              User, or Brand.
            </p>
            <p>Please note that only Creators can apply for campaigns.</p>
          </>
        )}
      </div>
    </>
  );
}
