export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  const returnToken = localStorage.getItem('accessToken');
  return returnToken;
};

export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};
