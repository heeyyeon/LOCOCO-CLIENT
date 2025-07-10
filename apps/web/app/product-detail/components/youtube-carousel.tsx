// Import Swiper React components
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertToEmbedUrl } from 'utils/youtube';
import { useState } from 'react';
import { IconButton } from '@lococo/design-system';
import { SvgArrowRight } from '@/icons';
import { SvgKoreanReview } from '@/icons';
import './youtube-carousel.css';

export default function YoutubeCarousel() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isNextButton, setIsNextButton] = useState(true);
  const [isPrevButton, setIsPrevButton] = useState(false);

  // TODO: 영상 API response props로 변경
  const videoListData = [
    'https://www.youtube.com/watch?v=QGxvmQaE4Ko&pp=ygU77JWE64iE7JWEIOudvOydtOyKpCA3MCDquIDroZzsmrAg67CA7YKkIO2GoOuEiCAyNTBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=1qfbzYo7VL0&pp=ygU77JWE64iE7JWEIOudvOydtOyKpCA3MCDquIDroZzsmrAg67CA7YKkIO2GoOuEiCAyNTBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=JSbMIRD3wdQ&pp=ygU77JWE64iE7JWEIOudvOydtOyKpCA3MCDquIDroZzsmrAg67CA7YKkIO2GoOuEiCAyNTBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=XFqGoXH5YXU&pp=ygU77JWE64iE7JWEIOudvOydtOyKpCA3MCDquIDroZzsmrAg67CA7YKkIO2GoOuEiCAyNTBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=CM4i-_JqYdE&pp=ygU77JWE64iE7JWEIOudvOydtOyKpCA3MCDquIDroZzsmrAg67CA7YKkIO2GoOuEiCAyNTBtbCDrpqzrt7A%3D',
    'https://www.youtube.com/watch?v=2PuUu5vWEKw&pp=ygVA7J207KaI7JWk7Yq466asIOy0iOyggOu2hOyekCDtnojslYzro6jroaDsgrAg7Yag64SIIDMwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=6QHhKarXyfs&pp=ygVA7J207KaI7JWk7Yq466asIOy0iOyggOu2hOyekCDtnojslYzro6jroaDsgrAg7Yag64SIIDMwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=vZ9qo-Hvl50&pp=ygVA7J207KaI7JWk7Yq466asIOy0iOyggOu2hOyekCDtnojslYzro6jroaDsgrAg7Yag64SIIDMwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=dwEQj4BWjGI&t=306s&pp=ygVA7J207KaI7JWk7Yq466asIOy0iOyggOu2hOyekCDtnojslYzro6jroaDsgrAg7Yag64SIIDMwMG1sIOumrOu3sNIHCQnDCQGHKiGM7w%3D%3D,https://www.youtube.com/watch?v=mlPEWugPH5U&pp=ygVA7J207KaI7JWk7Yq466asIOy0iOyggOu2hOyekCDtnojslYzro6jroaDsgrAg7Yag64SIIDMwMG1sIOumrOu3sA%3D%3D',
    'https://www.youtube.com/watch?v=IB8q2eM9cKw&t=7s&pp=ygVB65287Jq065Oc656pIDEwMjUg64-F64-EIO2GoOuEiCAyMDBtbCDquLDtmo0oK-2GoOuEiCA1MG1sKSDrpqzrt7A%3D,https://www.youtube.com/watch?v=1GANEhxNa3Y&pp=ygVB65287Jq065Oc656pIDEwMjUg64-F64-EIO2GoOuEiCAyMDBtbCDquLDtmo0oK-2GoOuEiCA1MG1sKSDrpqzrt7A%3D,https://www.youtube.com/watch?v=pNSuT20DneQ&pp=ygVB65287Jq065Oc656pIDEwMjUg64-F64-EIO2GoOuEiCAyMDBtbCDquLDtmo0oK-2GoOuEiCA1MG1sKSDrpqzrt7DSBwkJwwkBhyohjO8%3D,https://www.youtube.com/watch?v=lMulSQne1iQ&pp=ygVB65287Jq065Oc656pIDEwMjUg64-F64-EIO2GoOuEiCAyMDBtbCDquLDtmo0oK-2GoOuEiCA1MG1sKSDrpqzrt7A%3D,https://www.youtube.com/watch?v=ULP-7plq6T4&pp=ygVB65287Jq065Oc656pIDEwMjUg64-F64-EIO2GoOuEiCAyMDBtbCDquLDtmo0oK-2GoOuEiCA1MG1sKSDrpqzrt7A%3D',
    'https://www.youtube.com/watch?v=vYDyjzRSd7w&pp=ygUq7JWE7J6E7ZSE66GsIOudvOydtOyKpCDthqDrhIggMTUwbWwg66as67ew,https://www.youtube.com/watch?v=URdRlIC4K7M&pp=ygUq7JWE7J6E7ZSE66GsIOudvOydtOyKpCDthqDrhIggMTUwbWwg66as67ew,https://www.youtube.com/watch?v=DabGJaknSsc&pp=ygUq7JWE7J6E7ZSE66GsIOudvOydtOyKpCDthqDrhIggMTUwbWwg66as67ew,https://www.youtube.com/watch?v=YiVlbeu-mIg&pp=ygUq7JWE7J6E7ZSE66GsIOudvOydtOyKpCDthqDrhIggMTUwbWwg66as67ew,https://www.youtube.com/watch?v=Vom3eQjsiGQ&pp=ygUq7JWE7J6E7ZSE66GsIOudvOydtOyKpCDthqDrhIggMTUwbWwg66as67ew0gcJCcMJAYcqIYzv',
    'https://www.youtube.com/watch?v=-qxswATToa0&pp=ygVC7Iqk7YKoMTAwNCDrp4jri6TqsIDsiqTsubTrpbQg7IS87YWU6528IO2GoOuLnSDthqDrhIggMjEwbWwg66as67ew,https://www.youtube.com/watch?v=_SoEl5rfvbg&pp=ygVC7Iqk7YKoMTAwNCDrp4jri6TqsIDsiqTsubTrpbQg7IS87YWU6528IO2GoOuLnSDthqDrhIggMjEwbWwg66as67ew0gcJCcMJAYcqIYzv,https://www.youtube.com/watch?v=wwDJ0vqIxMw&pp=ygVC7Iqk7YKoMTAwNCDrp4jri6TqsIDsiqTsubTrpbQg7IS87YWU6528IO2GoOuLnSDthqDrhIggMjEwbWwg66as67ew,https://www.youtube.com/watch?v=WHxI1sr5Xr8&pp=ygVC7Iqk7YKoMTAwNCDrp4jri6TqsIDsiqTsubTrpbQg7IS87YWU6528IO2GoOuLnSDthqDrhIggMjEwbWwg66as67ew,https://www.youtube.com/watch?v=AJ7z3hWES0w&pp=ygVC7Iqk7YKoMTAwNCDrp4jri6TqsIDsiqTsubTrpbQg7IS87YWU6528IO2GoOuLnSDthqDrhIggMjEwbWwg66as67ew0gcJCcMJAYcqIYzv',
    'https://www.youtube.com/watch?v=jv6rGnE2iHM&pp=ygVL7Jio6re466as65SU7Ja47LigIOyKpO2CqCDrsLDrpqzslrQg7Lm067CNIOuhnOyFmCDquLDtmo0oMjIwbWwrODBtbCkg66as67ew0gcJCcMJAYcqIYzv,https://www.youtube.com/watch?v=77_vu7-ZA50&pp=ygVL7Jio6re466as65SU7Ja47LigIOyKpO2CqCDrsLDrpqzslrQg7Lm067CNIOuhnOyFmCDquLDtmo0oMjIwbWwrODBtbCkg66as67ew,https://www.youtube.com/watch?v=Ias-yAb8at8&pp=ygVL7Jio6re466as65SU7Ja47LigIOyKpO2CqCDrsLDrpqzslrQg7Lm067CNIOuhnOyFmCDquLDtmo0oMjIwbWwrODBtbCkg66as67ew,https://www.youtube.com/watch?v=CyeBMCrF4ZM&pp=ygVL7Jio6re466as65SU7Ja47LigIOyKpO2CqCDrsLDrpqzslrQg7Lm067CNIOuhnOyFmCDquLDtmo0oMjIwbWwrODBtbCkg66as67ew,https://www.youtube.com/watch?v=ZX0HkUB9Pj0&pp=ygVL7Jio6re466as65SU7Ja47LigIOyKpO2CqCDrsLDrpqzslrQg7Lm067CNIOuhnOyFmCDquLDtmo0oMjIwbWwrODBtbCkg66as67ew',
    'https://www.youtube.com/watch?v=P53Ak8FgsrM&pp=ygUv64us67CUIOu5hO2DgCDthqDri50g7IS465-8IOuhnOyFmCAxMDBtbCDrpqzrt7DSBwkJwwkBhyohjO8%3D,https://www.youtube.com/watch?v=7Zbf2eTTghc&pp=ygUv64us67CUIOu5hO2DgCDthqDri50g7IS465-8IOuhnOyFmCAxMDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=akl_j4YfEqU&pp=ygUv64us67CUIOu5hO2DgCDthqDri50g7IS465-8IOuhnOyFmCAxMDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=bAAMIXk2vpM&pp=ygUv64us67CUIOu5hO2DgCDthqDri50g7IS465-8IOuhnOyFmCAxMDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=RrnBPj3w81M&pp=ygUv64us67CUIOu5hO2DgCDthqDri50g7IS465-8IOuhnOyFmCAxMDBtbCDrpqzrt7A%3D',
    'https://www.youtube.com/watch?v=7S6H61EzGaM&pp=ygUs65287Jq065Oc656pIDEwMjUg64-F64-EIOuhnOyFmCA0MDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=wgCYfU7lL-s&pp=ygUs65287Jq065Oc656pIDEwMjUg64-F64-EIOuhnOyFmCA0MDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=mshQokteWHs&pp=ygUs65287Jq065Oc656pIDEwMjUg64-F64-EIOuhnOyFmCA0MDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=XcTsCJ6_Btc&pp=ygUs65287Jq065Oc656pIDEwMjUg64-F64-EIOuhnOyFmCA0MDBtbCDrpqzrt7A%3D,https://www.youtube.com/watch?v=1mTI3wwNih0&pp=ygUs65287Jq065Oc656pIDEwMjUg64-F64-EIOuhnOyFmCA0MDBtbCDrpqzrt7A%3D',
    'https://www.youtube.com/watch?v=Q-wQw9Euqo8&pp=ygVG7L2U7Iqk7JWM7JeR7IqkIOyYpOydvO2UhOumrCDrqqjsnbTsiqTsspjrnbzsnbTsp5Ug66Gc7IWYIDEwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=PPlGiuJaJ08&pp=ygVG7L2U7Iqk7JWM7JeR7IqkIOyYpOydvO2UhOumrCDrqqjsnbTsiqTsspjrnbzsnbTsp5Ug66Gc7IWYIDEwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=HeU8qT0G6PM&pp=ygVG7L2U7Iqk7JWM7JeR7IqkIOyYpOydvO2UhOumrCDrqqjsnbTsiqTsspjrnbzsnbTsp5Ug66Gc7IWYIDEwMG1sIOumrOu3sNIHCQnDCQGHKiGM7w%3D%3D,https://www.youtube.com/watch?v=go4iRix-lMw&pp=ygVG7L2U7Iqk7JWM7JeR7IqkIOyYpOydvO2UhOumrCDrqqjsnbTsiqTsspjrnbzsnbTsp5Ug66Gc7IWYIDEwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=eVze7OEZT6M&pp=ygVG7L2U7Iqk7JWM7JeR7IqkIOyYpOydvO2UhOumrCDrqqjsnbTsiqTsspjrnbzsnbTsp5Ug66Gc7IWYIDEwMG1sIOumrOu3sA%3D%3D',
    'https://www.youtube.com/watch?v=xID95ItMuSE&pp=ygU07JWE64iE7JWEIOyWtOyEsey0iCA3MCDrjbDsnbzrpqwg66Gc7IWYIDIwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=3UQnHdyG-pU&pp=ygU07JWE64iE7JWEIOyWtOyEsey0iCA3MCDrjbDsnbzrpqwg66Gc7IWYIDIwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=Y7VPr20rEtw&pp=ygU07JWE64iE7JWEIOyWtOyEsey0iCA3MCDrjbDsnbzrpqwg66Gc7IWYIDIwMG1sIOumrOu3sA%3D%3D,https://www.youtube.com/watch?v=DYatThusJfA&pp=ygU07JWE64iE7JWEIOyWtOyEsey0iCA3MCDrjbDsnbzrpqwg66Gc7IWYIDIwMG1sIOumrOu3sNIHCQnDCQGHKiGM7w%3D%3D,https://www.youtube.com/watch?v=9ms8Ef-BHq8&pp=ygU07JWE64iE7JWEIOyWtOyEsey0iCA3MCDrjbDsnbzrpqwg66Gc7IWYIDIwMG1sIOumrOu3sNIHCQnDCQGHKiGM7w%3D%3D',
  ];

  const handleSwiper = (swiper: SwiperType) => {
    setSwiperRef(swiper);
    if (videoListData.length - 2 === swiper.activeIndex) {
      setIsNextButton(false);
    } else {
      setIsNextButton(true);
    }
    if (swiper.activeIndex === 0) {
      setIsPrevButton(false);
    } else {
      setIsPrevButton(true);
    }
  };

  return (
    <div className="flex flex-col gap-[3.2rem]">
      <h3 className="text-jp-head2 inline-flex items-center gap-[1.2rem] font-bold text-gray-800">
        <SvgKoreanReview size={24} /> 韓国ユーチューバーレビュー
      </h3>
      <div className="relative">
        <Swiper
          onSwiper={handleSwiper}
          slidesPerView={2.5}
          slidesPerGroup={1}
          centeredSlides={true}
          onSlideChange={handleSwiper}
          spaceBetween={0}
          pagination={{
            type: 'fraction',
            clickable: true,
          }}
          navigation={false}
          modules={[Navigation]}
          className="youtube-swiper"
        >
          {videoListData.map((video) => (
            <SwiperSlide key={video}>
              <iframe
                width="552"
                height="311"
                src={convertToEmbedUrl(video)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </SwiperSlide>
          ))}
        </Swiper>

        {isPrevButton && (
          <IconButton
            className="absolute bottom-[1rem] left-4 top-1/2 z-10 size-[3.2rem] -translate-y-1/2 bg-white p-0"
            onClick={() => swiperRef?.slidePrev()}
            size="md"
            icon={<SvgArrowRight className="rotate-180" />}
            color="tertiary"
            rounded
          />
        )}

        {isNextButton && (
          <IconButton
            className="absolute right-4 top-1/2 z-10 size-[3.2rem] -translate-y-1/2 bg-white p-0"
            onClick={() => swiperRef?.slideNext()}
            size="md"
            icon={<SvgArrowRight />}
            rounded
            color="tertiary"
          />
        )}
      </div>
    </div>
  );
}
