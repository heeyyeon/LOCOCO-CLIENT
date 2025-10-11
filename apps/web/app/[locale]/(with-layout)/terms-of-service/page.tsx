import React from 'react';

import { useTranslations } from 'next-intl';

import { Section, SubSection } from '../privacy-policy/components/Section';
import Text from '../privacy-policy/components/Text';

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
  return <Section title={t('effectiveDate')} />;
}

function AcceptanceOfTerms() {
  const t = useTranslations('termsOfService');
  return (
    <Section title={`1. ${t('acceptanceOfTerms.title')}`}>
      <Text text={t('acceptanceOfTerms.description')} />
    </Section>
  );
}

function Eligibility() {
  const t = useTranslations('termsOfService.eligibility');
  return (
    <Section title={`2. ${t('title')}`}>
      <SubSection
        items={[
          t('descriptions.serviceAvailability'),
          t('descriptions.accountCreation'),
        ]}
      />
    </Section>
  );
}

function PersonalInformation() {
  const t = useTranslations('termsOfService.personalInformation');
  return (
    <Section title={`3. ${t('title')}`}>
      <SubSection
        items={[t('descriptions.collection'), t('descriptions.email')]}
      />
    </Section>
  );
}

function AccountTerminationAndDataRetention() {
  const t = useTranslations(
    'termsOfService.accountTerminationAndDataRetention'
  );
  return (
    <Section title={`4. ${t('title')}`}>
      <SubSection
        items={[
          t('descriptions.accountDeletion'),
          t('descriptions.dataRetention'),
        ]}
      />
    </Section>
  );
}

function ProhibitedActivities() {
  const t = useTranslations('termsOfService.prohibitedActivities');
  return (
    <Section title={`5. ${t('title')}`}>
      <SubSection
        subtitle={t('description')}
        items={[
          t('descriptions.multipleAccounts'),
          t('descriptions.fraudulentActivities'),
          t('descriptions.illegalContent'),
          t('descriptions.disruption'),
        ]}
      />
      <SubSection description={t('description2')} />
    </Section>
  );
}

function IntellectualProperty() {
  const t = useTranslations('termsOfService.intellectualProperty');
  return (
    <Section title={`6. ${t('title')}`}>
      <SubSection
        items={[t('descriptions.content'), t('descriptions.ownership')]}
      />
    </Section>
  );
}

function LimitationOfLiability() {
  const t = useTranslations('termsOfService.limitationOfLiability');
  return (
    <Section title={`7. ${t('title')}`}>
      <Text text={t('description')} />
    </Section>
  );
}

function GoverningLaw() {
  const t = useTranslations('termsOfService.governingLaw');
  return (
    <Section title={`8. ${t('title')}`}>
      <Text text={t('description')} />
    </Section>
  );
}

function ContactUs() {
  const t = useTranslations('termsOfService.contactUs');
  return (
    <Section title={`9. ${t('title')}`}>
      <SubSection
        subtitle={t('description')}
        items={[t('team'), t('location'), t('email')]}
      />
    </Section>
  );
}
