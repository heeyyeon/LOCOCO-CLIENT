interface LineLoginProps {
  code: string;
  state: string;
}

const lineLogin = async ({ code, state }: LineLoginProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/line/login?code=${code}&state=${state}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch line login');
  }
  return response.json();
};

export default lineLogin;
