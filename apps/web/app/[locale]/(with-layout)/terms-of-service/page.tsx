import React from 'react';

import { useTranslations } from 'next-intl';

import SubTitle from '../privacy-policy/components/SubTitle';
import Text from '../privacy-policy/components/Text';
import Title from '../privacy-policy/components/Title';

export default function TermsOfService() {
  const t = useTranslations('termsOfService');
  return (
    <div className="mx-auto flex w-[112.8rem] flex-col gap-[6rem] py-[6.4rem]">
      <p className="head1 font-[700] text-pink-500">{t('title')}</p>
      <div className="flex flex-col gap-[4rem]">
        <EffectiveDate />
        <AcceptanceOfTerms />
        <Eligibility />
        <PersonalInformation />
        <AccountTerminationAndDataRetention />
        <ProhibitedActivities />
        <IntellectualProperty />
        <LimitationOfLiability />
        <GoverningLaw />
        <ContactUs />
      </div>
    </div>
  );
}

function EffectiveDate() {
  const t = useTranslations('termsOfService');
  return <Title title={t('effectiveDate')} />;
}

function AcceptanceOfTerms() {
  const t = useTranslations('termsOfService');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`1. ${t('acceptanceOfTerms.title')}`} />
      <Text text={t('acceptanceOfTerms.description')} />
    </div>
  );
}

function Eligibility() {
  const t = useTranslations('termsOfService.eligibility');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`2. ${t('title')}`} />
      <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
        <li>
          <Text text={t('descriptions.serviceAvailability')} />
        </li>
        <li>
          <Text text={t('descriptions.accountCreation')} />
        </li>
      </ul>
    </div>
  );
}

function PersonalInformation() {
  const t = useTranslations('termsOfService.personalInformation');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`3. ${t('title')}`} />
      <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
        <li>
          <Text text={t('descriptions.collection')} />
        </li>
        <li>
          <Text text={t('descriptions.email')} />
        </li>
      </ul>
    </div>
  );
}

function AccountTerminationAndDataRetention() {
  const t = useTranslations(
    'termsOfService.accountTerminationAndDataRetention'
  );
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`4. ${t('title')}`} />
      <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
        <li>
          <Text text={t('descriptions.accountDeletion')} />{' '}
        </li>
        <li>
          <Text text={t('descriptions.dataRetention')} />
        </li>
      </ul>
    </div>
  );
}

function ProhibitedActivities() {
  const t = useTranslations('termsOfService.prohibitedActivities');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`5. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('description')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('descriptions.multipleAccounts')} />
          </li>
          <li>
            <Text text={t('descriptions.fraudulentActivities')} />
          </li>
          <li>
            <Text text={t('descriptions.illegalContent')} />
          </li>
          <li>
            <Text text={t('descriptions.disruption')} />
          </li>
        </ul>
        <Text text={t('description2')} />
      </div>
    </div>
  );
}

function IntellectualProperty() {
  const t = useTranslations('termsOfService.intellectualProperty');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`6. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('descriptions.content')} />
          </li>
          <li>
            <Text text={t('descriptions.ownership')} />
          </li>
        </ul>
      </div>
    </div>
  );
}

function LimitationOfLiability() {
  const t = useTranslations('termsOfService.limitationOfLiability');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`7. ${t('title')}`} />
      <Text text={t('description')} />
    </div>
  );
}

function GoverningLaw() {
  const t = useTranslations('termsOfService.governingLaw');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`8. ${t('title')}`} />
      <Text text={t('description')} />
    </div>
  );
}

function ContactUs() {
  const t = useTranslations('termsOfService.contactUs');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`9. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('description')} />
        <Text text={t('team')} />
        <Text text={t('location')} />
        <Text text={t('email')} />
      </div>
    </div>
  );
}
