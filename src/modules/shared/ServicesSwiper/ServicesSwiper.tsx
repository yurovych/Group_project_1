import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ServicesSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { ServiceCardType } from '../../../types/Service';
import { EquipmentCardType } from '../../../types/Equipment';
import { VideoFileType } from '../../../types/Video';
import { SongTrackType } from '../../../types/SongTrack';
import { SimplePhoto } from '../../../types/SimplePhoto';
import SwiperOptions from 'swiper';
import { ArrowLeftIcon } from '../../../iconsMove/arrow-left';
import { ArrowRightIcon } from '../../../iconsMove/arrow-right';

type ServicesSwiperProps = {
  type: 'type1' | 'type2' | 'type3';
  equipmentCadrs?: EquipmentCardType[];
  servicesCards?: ServiceCardType[];
  servicesWideCards?: ServiceCardType[];
  videoCards?: VideoFileType[];
  songsCards?: SongTrackType[];
  ServiceToRender?: React.FC<{
    card: ServiceCardType;
    visual: 'brief' | 'wide';
  }>;
  EquipmentToRender?: React.FC<{ card: EquipmentCardType }>;
  VideoToRender?: React.FC<{ card: VideoFileType }>;
  SongToRender?: React.FC<{
    track: SongTrackType;
    visual: 'card' | 'strip' | 'mini' | 'player';
    currentSongsArray: SongTrackType[];
  }>;
  simplePhotos?: SimplePhoto[];
};

export const ServicesSwiper = ({
  type,
  equipmentCadrs,
  servicesCards,
  videoCards,
  songsCards,
  ServiceToRender,
  EquipmentToRender,
  VideoToRender,
  SongToRender,
  simplePhotos,
}: ServicesSwiperProps) => {
  function breakpoints(): { [key: number]: SwiperOptions } {
    switch (type) {
      case 'type1':
        return {
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
        };

      case 'type2':
        return { 375: { slidesPerView: 1.1 }, 1024: { slidesPerView: 3 } };

      default:
        return { 375: { slidesPerView: 1 } };
    }
  }

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        style={type === 'type2' ? { paddingInline: '32px' } : undefined}
        modules={[Pagination, FreeMode, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation={
          type !== 'type3' && {
            prevEl: '#slider-arrow-left',
            nextEl: '#slider-arrow-right',
          }
        }
        autoplay={type === 'type3' ? { delay: 5000 } : false}
        loop={type === 'type3' ? true : false}
        spaceBetween={type === 'type2' ? 24 : 16}
        freeMode={type === 'type2' && true}
        slidesPerView={1}
        breakpoints={breakpoints()}
      >
        {ServiceToRender &&
          servicesCards &&
          servicesCards.map((card) => (
            <SwiperSlide key={card.id}>
              <ServiceToRender card={card} visual='brief' />
            </SwiperSlide>
          ))}
        {EquipmentToRender &&
          equipmentCadrs &&
          equipmentCadrs.map((card) => (
            <SwiperSlide key={card.id}>
              <EquipmentToRender card={card} />
            </SwiperSlide>
          ))}
        {VideoToRender &&
          videoCards &&
          videoCards.map((card) => (
            <SwiperSlide key={card.id}>
              <VideoToRender card={card} />
            </SwiperSlide>
          ))}
        {SongToRender &&
          songsCards &&
          songsCards.map((card) => (
            <SwiperSlide key={card.id}>
              <SongToRender
                track={card}
                visual='card'
                currentSongsArray={songsCards}
              />
            </SwiperSlide>
          ))}
        {simplePhotos &&
          simplePhotos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <img
                className={styles.portfolioSlide}
                src={photo.photo}
                alt='studio_photo'
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {type !== 'type3' && (
        <div className={styles.swiperNavigation}>
          <button
            className={`${styles.swiperButton} ${styles.swiperButton_left}`}
            id='slider-arrow-left'
          >
            <ArrowLeftIcon />
          </button>
          <button
            className={`${styles.swiperButton} ${styles.swiperButton_right}`}
            id='slider-arrow-right'
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};
