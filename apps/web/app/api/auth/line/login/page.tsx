'use client';

import React, { useEffect, useState } from 'react';

export default function page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state') || '';

      try {
        const response = await fetch(
          `https://52.79.208.129.nip.io/api/auth/line/login?code=${code}&state=${state}`
        );
        const data = await response.json();
        setData(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>hi page</div>;
}
