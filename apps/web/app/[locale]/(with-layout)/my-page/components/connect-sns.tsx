import React from 'react';

import { Button } from '@lococo/design-system/button';

export default function ConnectSNS() {
  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      <div className="flex w-[84rem] items-center justify-between gap-[4.8rem] border border-gray-400 bg-white px-[6.4rem] py-[12.8rem]">
        <div className="flex w-full flex-col items-start gap-[4.8rem]">
          <section className="flex w-full flex-col gap-[1.6rem]">
            <div className="flex flex-col gap-[0.6rem]">
              <p className="inter-title2 text-gray-800">SNS Link</p>
              <p className="inter-caption3 text-gray-500">
                Connect your Social Account!
              </p>
            </div>
            <div className="flex flex-col gap-[2rem]">
              <div className="flex items-center justify-between">
                <p>Instagram</p>
                <div>
                  <p>Connect</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>TikTok</p>
                <div>
                  <p>Connect</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
        <Button
          variant="outline"
          color="primary"
          size="lg"
          className="w-[41.2rem]"
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="primary"
          size="lg"
          className="w-[41.2rem]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
