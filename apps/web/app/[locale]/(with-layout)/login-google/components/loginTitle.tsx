export default function LoginTitle({
  authType = 'login',
}: {
  authType?: 'login' | 'signup';
}) {
  return (
    <section className="text-center">
      <h1 className="inter-head3 mb-[1.6rem] font-bold text-pink-500">
        Welcome to Lococo!
      </h1>
      <div className="inter-caption2 font-medium text-gray-800">
        {authType === 'login' ? (
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
    </section>
  );
}
