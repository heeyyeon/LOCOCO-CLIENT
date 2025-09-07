import LoginButton from './components/loginButton';
import LoginTitle from './components/loginTitle';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const mode = searchParams.mode === 'signup' ? 'signup' : 'login';

  return (
    <main className="mx-auto flex w-screen min-w-[1366px] items-center justify-center bg-gray-100">
      <section className="mx-auto my-[11.95rem] flex h-[44.2rem] w-[74.4rem] flex-col items-center border border-gray-400 bg-white py-[12rem]">
        <LoginTitle mode={mode} />
        <LoginButton />
      </section>
    </main>
  );
}
