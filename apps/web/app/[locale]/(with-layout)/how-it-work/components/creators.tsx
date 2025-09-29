import React from 'react';

import { useTranslations } from 'next-intl';

import { SvgBus, SvgTodo, SvgUpload, SvgUploadSchedule } from '@lococo/icons';

import Info from './info';

export default function Creator() {
  const t = useTranslations('howItWork.creators');
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <p className="head2 font-bold text-gray-900">{t('title')}</p>

      <div className="relative">
        <div className="absolute bottom-0 left-1/2 top-0 w-[1px] -translate-x-1/2 transform bg-pink-300"></div>
        <div className="absolute bottom-0 left-1/2 h-[2.4rem] w-[2.4rem] -translate-x-1/2 transform rounded-full bg-pink-300"></div>

        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex justify-start pr-[50%]">
            <Info
              number={1}
              title={t('confirmAddress.title')}
              description={t('confirmAddress.description')}
              icon={
                <SvgBus className="fill-pink-500" width={144} height={144} />
              }
              direction="left"
            />
          </div>

          {/* Row 2: Step 2 (right side of center line) */}
          <div className="flex justify-end pl-[50%]">
            <Info
              number={2}
              title={t('uploadReview.title')}
              description={t('uploadReview.description')}
              icon={
                <SvgUpload className="fill-pink-500" width={144} height={144} />
              }
              direction="right"
            />
          </div>

          {/* Row 3: Step 3 (left side of center line) */}
          <div className="flex justify-start pr-[50%]">
            <Info
              number={3}
              title={t('reviewUploadSchedule.title')}
              description={t('reviewUploadSchedule.description')}
              icon={
                <SvgUploadSchedule
                  className="fill-pink-500"
                  width={144}
                  height={144}
                />
              }
              direction="left"
            />
          </div>

          {/* Row 4: Step 4 (right side of center line) */}
          <div className="flex justify-end pl-[50%]">
            <Info
              number={4}
              title={t('maintenanceGuidelines.title')}
              description={t('maintenanceGuidelines.description')}
              icon={
                <SvgTodo className="fill-pink-500" width={144} height={144} />
              }
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
