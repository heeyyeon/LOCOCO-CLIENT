import { getUserStatus } from 'app/(with-layout)/(home)/utils/getUserStatus';
import React from 'react';
import ClientPage from './page.client';

export default async function page() {
  const isUserLogin = await getUserStatus();
  return <ClientPage userStatus={isUserLogin} />;
}
