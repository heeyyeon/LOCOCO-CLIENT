import React from 'react';

import { useTranslations } from 'next-intl';

import { Section, SubSection } from './components/Section';
import Text from './components/Text';

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPolicy');
  return (
    <div className="mx-auto flex w-[112.8rem] flex-col gap-[6rem] py-[6.4rem]">
      <p className="head1 font-[700] text-pink-500">{t('title')}</p>
      <div className="flex flex-col gap-[4rem]">
        <LastUpdated />
        <InterpretationAndDefinitions />
        <DataWeCollect />
        <TrackingAndCookies />
        <HowWeUseYourData />
        <DataRetention />
        <DataTransfers />
        <YourRights />
        <DisclosureOfData />
        <SecurityOfData />
        <ChildrensPrivacy />
        <ExternalLinks />
        <ChangesToThisPrivacyPolicy />
        <DataDeletion />
        <ContactUs />
      </div>
    </div>
  );
}

function LastUpdated() {
  const t = useTranslations('privacyPolicy.lastUpdated');
  return (
    <Section title={t('title')}>
      <Text text={t('description')} />
    </Section>
  );
}

function InterpretationAndDefinitions() {
  const t = useTranslations('privacyPolicy.interpretationAndDefinitions');
  const definitions = [
    `${t('definitions.description.Account.title')}: ${t('definitions.description.Account.description')}`,
    `${t('definitions.description.Affiliate.title')}: ${t('definitions.description.Affiliate.description')}`,
    `${t('definitions.description.Company.title')}: ${t('definitions.description.Company.description')}`,
    `${t('definitions.description.Cookies.title')}: ${t('definitions.description.Cookies.description')}`,
    `${t('definitions.description.Country.title')}: ${t('definitions.description.Country.description')}`,
    `${t('definitions.description.Device.title')}: ${t('definitions.description.Device.description')}`,
    `${t('definitions.description.PersonalData.title')}: ${t('definitions.description.PersonalData.description')}`,
    `${t('definitions.description.Service.title')}: ${t('definitions.description.Service.description')}`,
    `${t('definitions.description.ServiceProvider.title')}: ${t('definitions.description.ServiceProvider.description')}`,
    `${t('definitions.description.ThirdPartySocialMediaService.title')}: ${t('definitions.description.ThirdPartySocialMediaService.description')}`,
    `${t('definitions.description.UsageData.title')}: ${t('definitions.description.UsageData.description')}`,
    `${t('definitions.description.You.title')}: ${t('definitions.description.You.description')}`,
  ];

  return (
    <Section title={`1. ${t('title')}`}>
      <SubSection
        subtitle={t('interpretation.title')}
        description={t('interpretation.description')}
      />
      <SubSection subtitle={t('definitions.title')} items={definitions} />
    </Section>
  );
}

function DataWeCollect() {
  const t = useTranslations('privacyPolicy.dataWeCollect');
  const personalDataItems = [
    t('personalData.descriptions.descriptions.name'),
    t('personalData.descriptions.descriptions.email'),
    t('personalData.descriptions.descriptions.phone'),
    t('personalData.descriptions.descriptions.address'),
  ];

  const usageDataItems = [
    t('usageData.descriptions.description.ipAddress'),
    t('usageData.descriptions.description.dateTime'),
    t('usageData.descriptions.description.deviceDetails'),
  ];

  return (
    <Section title={`2. ${t('title')}`}>
      <SubSection
        subtitle={t('personalData.title')}
        description={t('personalData.descriptions.title')}
        items={personalDataItems}
      />
      <SubSection
        subtitle={t('usageData.title')}
        description={t('usageData.descriptions.title')}
        items={usageDataItems}
      />
      <SubSection
        subtitle={t('dataFromSocialMedia.title')}
        description={t('dataFromSocialMedia.descriptions.title')}
      />
    </Section>
  );
}

function TrackingAndCookies() {
  const t = useTranslations('privacyPolicy.trackingTechnologiesAndCookies');
  return (
    <Section title={`3. ${t('title')}`}>
      <SubSection
        subtitle={t('typesOfCookies.title')}
        items={[
          `${t('typesOfCookies.descriptions.essentialCookies.title')} - ${t('typesOfCookies.descriptions.essentialCookies.description')}`,
          `${t('typesOfCookies.descriptions.consentCookies.title')} - ${t('typesOfCookies.descriptions.consentCookies.description')}`,
          `${t('typesOfCookies.descriptions.functionalityCookies.title')} - ${t('typesOfCookies.descriptions.functionalityCookies.description')}`,
        ]}
      />
    </Section>
  );
}

function HowWeUseYourData() {
  const t = useTranslations('privacyPolicy.howWeUseYourData');
  const usageItems = [
    t('descriptions.provideService'),
    t('descriptions.manageAccount'),
    t('descriptions.performContractualObligations'),
    t('descriptions.contactYou'),
    t('descriptions.providePromotionalOffers'),
    t('descriptions.manageInquiriesAndRequests'),
    t('descriptions.supportBusinessTransfers'),
    t('descriptions.conductAnalyticsAndImproveService'),
  ];

  const sharingItems = [
    t('informationSharing.descriptions.withServiceProviders'),
    t('informationSharing.descriptions.withAffiliatesOrBusinessPartners'),
    t('informationSharing.descriptions.inBusinessTransfers'),
    t('informationSharing.descriptions.publicly'),
    t('informationSharing.descriptions.withConsent'),
  ];

  return (
    <Section title={`4. ${t('title')}`}>
      <SubSection subtitle={t('description')} items={usageItems} />
      <SubSection
        subtitle={t('informationSharing.title')}
        description={t('informationSharing.description')}
        items={sharingItems}
      />
    </Section>
  );
}

function DataRetention() {
  const t = useTranslations('privacyPolicy.dataRetention');
  return (
    <Section title={`5. ${t('title')}`}>
      <SubSection description={`${t('description')} ${t('description2')}`} />
    </Section>
  );
}

function DataTransfers() {
  const t = useTranslations('privacyPolicy.dataTransfers');
  return (
    <Section title={`6. ${t('title')}`}>
      <SubSection description={`${t('description')} ${t('description2')}`} />
    </Section>
  );
}
function YourRights() {
  const t = useTranslations('privacyPolicy.yourRights');
  const rightsItems = [
    t('descriptions.access'),
    t('descriptions.requestAssistance'),
  ];

  return (
    <Section title={`7. ${t('title')}`}>
      <SubSection subtitle={t('description')} items={rightsItems} />
      <SubSection subtitle={t('description2')} />
    </Section>
  );
}

function DisclosureOfData() {
  const t = useTranslations('privacyPolicy.disclosureOfData');
  return (
    <Section title={`8. ${t('title')}`}>
      <SubSection
        items={[
          t('descriptions.businessTransactions'),
          t('descriptions.legalRequirements'),
        ]}
      />
    </Section>
  );
}

function SecurityOfData() {
  const t = useTranslations('privacyPolicy.securityOfData');
  return (
    <Section title={`9. ${t('title')}`}>
      <SubSection description={`${t('description')} ${t('description2')}`} />
    </Section>
  );
}

function ChildrensPrivacy() {
  const t = useTranslations('privacyPolicy.childrensPrivacy');
  return (
    <Section title={`10. ${t('title')}`}>
      <SubSection description={`${t('description')} ${t('description2')}`} />
    </Section>
  );
}

function ExternalLinks() {
  const t = useTranslations('privacyPolicy.externalLinks');
  return (
    <Section title={`11. ${t('title')}`}>
      <Text text={t('description')} />
    </Section>
  );
}

function ChangesToThisPrivacyPolicy() {
  const t = useTranslations('privacyPolicy.changesToThisPrivacyPolicy');
  return (
    <Section title={`12. ${t('title')}`}>
      <SubSection description={`${t('description')} ${t('description2')}`} />
    </Section>
  );
}

function DataDeletion() {
  const t = useTranslations('privacyPolicy.dataDeletion');
  return (
    <Section title={`13. ${t('title')}`}>
      <Text text={t('description')} />
    </Section>
  );
}

function ContactUs() {
  const t = useTranslations('privacyPolicy.contactUs');
  return (
    <Section title={`14. ${t('title')}`}>
      <SubSection
        subtitle={t('description')}
        description={'📧 ' + t('email.title') + ': ' + t('email.description')}
      />
    </Section>
  );
}
