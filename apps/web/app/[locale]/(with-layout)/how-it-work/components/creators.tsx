import React from 'react';

import { useTranslations } from 'next-intl';

import {
  SvgBus,
  SvgCrown,
  SvgPersonTime,
  SvgPresent,
  SvgTodo,
  SvgUpload,
} from '@lococo/icons';

import Info from './info';

export default function Creator() {
  const t = useTranslations('howItWork.creators');
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <p className="head2 font-bold text-gray-900">{t('title')}</p>

      <div className="relative">
        <div className="absolute bottom-0 left-1/2 top-0 w-[1px] -translate-x-1/2 transform bg-pink-300"></div>
        <div className="absolute bottom-0 left-1/2 h-[2.4rem] w-[2.4rem] -translate-x-1/2 transform rounded-full bg-pink-300"></div>

        <div className="grid grid-cols-2 grid-rows-4 gap-y-[3.2rem]">
          <div className="col-start-1 row-start-1 flex justify-start">
            <Info
              number={1}
              title={t('applyForCampaign.title')}
              description={t('applyForCampaign.description')}
              icon={
                <SvgPresent
                  className="fill-pink-400"
                  width={144}
                  height={144}
                />
              }
              direction="left"
            />
          </div>

          <div className="col-start-2 row-start-2 flex justify-end">
            <Info
              number={2}
              title={t('waitForResultAnnouncement.title')}
              description={t('waitForResultAnnouncement.description')}
              icon={
                <SvgCrown className="fill-pink-400" width={144} height={144} />
              }
              direction="right"
            />
          </div>

          <div className="col-start-1 row-start-3 flex justify-start">
            <Info
              number={3}
              title={t('receiveAndTryTheProducts.title')}
              description={t('receiveAndTryTheProducts.description')}
              icon={
                <SvgBus className="fill-pink-400" width={144} height={144} />
              }
              direction="left"
            />
          </div>

          <div className="col-start-2 row-start-4 flex justify-end">
            <Info
              number={4}
              title={t('upload1stReview.title')}
              description={t('upload1stReview.description')}
              icon={
                <SvgUpload className="fill-pink-400" width={144} height={144} />
              }
              direction="right"
            />
          </div>
          <div className="col-start-1 row-start-5 flex justify-start">
            <Info
              number={5}
              title={t('reviewBrand’sFeedbackAndUpload2ndReview.title')}
              description={t(
                'reviewBrand’sFeedbackAndUpload2ndReview.description'
              )}
              icon={
                <SvgPersonTime
                  className="fill-pink-400"
                  width={144}
                  height={144}
                />
              }
              direction="left"
            />
          </div>

          <div className="col-start-2 row-start-6 flex justify-end">
            <Info
              number={6}
              title={t('keepYourReviewLive.title')}
              description={t('keepYourReviewLive.description')}
              icon={
                <SvgTodo className="fill-pink-400" width={144} height={144} />
              }
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
