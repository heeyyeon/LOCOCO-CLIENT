import React from 'react';

import { useTranslations } from 'next-intl';

import SubTitle from './components/SubTitle';
import Text from './components/Text';
import Title from './components/Title';

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
    <div>
      <Title title={t('title')} />
      <Text text={t('description')} />
    </div>
  );
}

function InterpretationAndDefinitions() {
  const t = useTranslations('privacyPolicy.interpretationAndDefinitions');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`1. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('interpretation.title')} />
        <Text text={t('interpretation.description')} />
      </div>
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('definitions.title')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text
              text={`${t('definitions.description.Account.title')}: ${t('definitions.description.Account.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Affiliate.title')}: ${t('definitions.description.Affiliate.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Company.title')}: ${t('definitions.description.Company.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Cookies.title')}: ${t('definitions.description.Cookies.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Country.title')}: ${t('definitions.description.Country.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Device.title')}: ${t('definitions.description.Device.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.PersonalData.title')}: ${t('definitions.description.PersonalData.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.Service.title')}: ${t('definitions.description.Service.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.ServiceProvider.title')}: ${t('definitions.description.ServiceProvider.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.ThirdPartySocialMediaService.title')}: ${t('definitions.description.ThirdPartySocialMediaService.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.UsageData.title')}: ${t('definitions.description.UsageData.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('definitions.description.You.title')}: ${t('definitions.description.You.description')}`}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

function DataWeCollect() {
  const t = useTranslations('privacyPolicy.dataWeCollect');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`2. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('personalData.title')} />
        <Text text={t('personalData.descriptions.title')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('personalData.descriptions.descriptions.name')} />
          </li>
          <li>
            <Text text={t('personalData.descriptions.descriptions.email')} />
          </li>
          <li>
            <Text text={t('personalData.descriptions.descriptions.phone')} />
          </li>
          <li>
            <Text text={t('personalData.descriptions.descriptions.address')} />
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('usageData.title')} />
        <Text text={t('usageData.descriptions.title')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('usageData.descriptions.description.ipAddress')} />
          </li>
          <li>
            <Text text={t('usageData.descriptions.description.dateTime')} />
          </li>
          <li>
            <Text
              text={t('usageData.descriptions.description.deviceDetails')}
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('dataFromSocialMedia.title')} />
        <Text text={t('dataFromSocialMedia.descriptions.title')} />
      </div>
    </div>
  );
}

function TrackingAndCookies() {
  const t = useTranslations('privacyPolicy.trackingTechnologiesAndCookies');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`3. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('typesOfCookies.title')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text
              text={`${t('typesOfCookies.descriptions.essentialCookies.title')} - ${t('typesOfCookies.descriptions.essentialCookies.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('typesOfCookies.descriptions.consentCookies.title')} - ${t('typesOfCookies.descriptions.consentCookies.description')}`}
            />
          </li>
          <li>
            <Text
              text={`${t('typesOfCookies.descriptions.functionalityCookies.title')} - ${t('typesOfCookies.descriptions.functionalityCookies.description')}`}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

function HowWeUseYourData() {
  const t = useTranslations('privacyPolicy.howWeUseYourData');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`4. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('description')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('descriptions.provideService')} />
          </li>
          <li>
            <Text text={t('descriptions.manageAccount')} />
          </li>
          <li>
            <Text text={t('descriptions.performContractualObligations')} />
          </li>
          <li>
            <Text text={t('descriptions.contactYou')} />
          </li>
          <li>
            <Text text={t('descriptions.providePromotionalOffers')} />
          </li>
          <li>
            <Text text={t('descriptions.manageInquiriesAndRequests')} />
          </li>
          <li>
            <Text text={t('descriptions.supportBusinessTransfers')} />
          </li>
          <li>
            <Text text={t('descriptions.conductAnalyticsAndImproveService')} />
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('informationSharing.title')} />
        <Text text={t('informationSharing.description')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text
              text={t('informationSharing.descriptions.withServiceProviders')}
            />
          </li>
          <li>
            <Text
              text={t(
                'informationSharing.descriptions.withAffiliatesOrBusinessPartners'
              )}
            />
          </li>
          <li>
            <Text
              text={t('informationSharing.descriptions.inBusinessTransfers')}
            />
          </li>
          <li>
            <Text text={t('informationSharing.descriptions.publicly')} />
          </li>
          <li>
            <Text text={t('informationSharing.descriptions.withConsent')} />
          </li>
        </ul>
      </div>
    </div>
  );
}

function DataRetention() {
  const t = useTranslations('privacyPolicy.dataRetention');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`5. ${t('title')}`} />
      <div className="flex flex-col">
        <Text text={t('description')} />
        <Text text={t('description2')} />
      </div>
    </div>
  );
}

function DataTransfers() {
  const t = useTranslations('privacyPolicy.dataTransfers');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`6. ${t('title')}`} />
      <div className="flex flex-col">
        <Text text={t('description')} />
        <Text text={t('description2')} />
      </div>
    </div>
  );
}
function YourRights() {
  const t = useTranslations('privacyPolicy.yourRights');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`7. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <SubTitle subTitle={t('description')} />
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('descriptions.access')} />
          </li>
          <li>
            <Text text={t('descriptions.requestAssistance')} />
          </li>
        </ul>
        <SubTitle subTitle={t('description2')} />
      </div>
    </div>
  );
}

function DisclosureOfData() {
  const t = useTranslations('privacyPolicy.disclosureOfData');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`8. ${t('title')}`} />
      <div className="flex flex-col gap-[1rem]">
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          <li>
            <Text text={t('descriptions.businessTransactions')} />
          </li>
          <li>
            <Text text={t('descriptions.legalRequirements')} />
          </li>
        </ul>
      </div>
    </div>
  );
}

function SecurityOfData() {
  const t = useTranslations('privacyPolicy.securityOfData');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`9. ${t('title')}`} />
      <div className="] flex flex-col">
        <Text text={t('description')} />
        <Text text={t('description2')} />
      </div>
    </div>
  );
}

function ChildrensPrivacy() {
  const t = useTranslations('privacyPolicy.childrensPrivacy');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`10. ${t('title')}`} />
      <div className="flex flex-col">
        <Text text={t('description')} />
        <Text text={t('description2')} />
      </div>
    </div>
  );
}

function ExternalLinks() {
  const t = useTranslations('privacyPolicy.externalLinks');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`11. ${t('title')}`} />
      <Text text={t('description')} />
    </div>
  );
}

function ChangesToThisPrivacyPolicy() {
  const t = useTranslations('privacyPolicy.changesToThisPrivacyPolicy');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`12. ${t('title')}`} />
      <div className="flex flex-col">
        <Text text={t('description')} />
        <Text text={t('description2')} />
      </div>
    </div>
  );
}
function DataDeletion() {
  const t = useTranslations('privacyPolicy.dataDeletion');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`13. ${t('title')}`} />
      <Text text={t('description')} />
    </div>
  );
}
function ContactUs() {
  const t = useTranslations('privacyPolicy.contactUs');
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={`14. ${t('title')}`} />
      <div className="flex flex-col">
        <Text text={t('description')} />
        <Text text={'📧 ' + t('email.title') + ': ' + t('email.description')} />
      </div>
    </div>
  );
}
