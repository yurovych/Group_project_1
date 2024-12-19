import styles from './HomePage.module.scss';

import { Footer } from '../../shared/Footer';
import { Button } from '../../shared/Button';
import { ServicesList } from '../../shared/ServicesList';
import equipmentList from './../../../data/equipmentCards.json';
import servicesList from './../../../data/servicesCards.json';
import songsList from './../../../data/songsCards.json';
import videosList from './../../../data/videos.json';
import { SongsList } from '../../shared/SongsList';
import { ServicesSwiper } from '../../shared/ServicesSwiper';
import { Link, useNavigate } from 'react-router-dom';
import { EquipmentList } from '../../shared/EquipmentList';
import { ContactUs } from '../../shared/ContactUs';
import { ServicesCard } from '../../shared/ServicesCard';
import { EquipmentCard } from '../../shared/EquipmentCard';
import { Loader } from '../../Loader';
import { SongTrackType } from '../../../types/SongTrack';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VideoPlayer } from '../../shared/VideoPlayer';

export const HomePage = () => {
  // const songsList = useAppSelector((state) => state.songs.objects);
  // const servicesList = useAppSelector((state) => state.sevrices.objects);
  // const equipmentList = useAppSelector((state) => state.equipment.objects);
  // const videosList = useAppSelector((state) => state.videos.objects);

  const navigate = useNavigate();
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const currenLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );
  const guitarTeacherVideo = videosList.find((video) => video.title_en);
  const { t } = useTranslation();

  async function handleTextMeClick() {
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  const [shuffledSongs, setShuffledSongs] = useState<SongTrackType[]>([]);

  const shuffleSongs = (songs: SongTrackType[]) => {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    return songs.slice(0, 5);
  };

  useEffect(() => {
    if (songsList) {
      setShuffledSongs(shuffleSongs(songsList));
    }
  }, []);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.topWrapper}>
          <section className={styles.top}>
            <h3 className={styles.top__newSong}>{t('home_green_text')} </h3>

            <div className={styles.top__photo}>
              <img
                className={styles.top__photoItself}
                src='./images/top-photo.jpg'
                alt='foto'
              />
            </div>

            <h1 className={styles.top__title}>{t('home_top_title')}</h1>

            <h3 className={styles.top__text}>{t('home_top_text')}</h3>

            <div onClick={handleTextMeClick} className={styles.top__button}>
              <Button text={t('home_top_button')} />
            </div>
          </section>
        </div>

        <div className={styles.aboutUsWrapper}>
          <section className={styles.aboutUs}>
            <h2 className={styles.aboutUs__title}>{t('home_about_title')}</h2>

            <div className={styles.aboutUs__photo}>
              <img
                className={styles.aboutUs__photoItself}
                src='./images/about-us-photo.jpg'
                alt='foto'
              />
            </div>

            <p className={styles.aboutUs__text}>{t('home_about_text')}</p>

            <div
              className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block1}`}
            >
              <div className={styles.aboutUs__advantage}>
                <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />
                <p>{t('home_about_marker1')}</p>
              </div>

              <div className={styles.aboutUs__advantage}>
                <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker2')}</p>
              </div>
            </div>

            <div
              className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block2}`}
            >
              <div className={styles.aboutUs__advantage}>
                <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker3')}</p>
              </div>

              <div className={styles.aboutUs__advantage}>
                <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker4')}</p>
              </div>
            </div>

            <Link
              onClick={scrollPageUp}
              to='./about'
              className={styles.aboutUs__button}
            >
              <Button text={t('home_about_button')} />
            </Link>
          </section>
        </div>

        <div className={styles.servicesWrapper}>
          <section className={styles.services}>
            <h2 className={styles.services__title}>
              {t('home_services_title')}
            </h2>

            <div className={styles.services__cardsPhone}>
              {servicesList ? (
                <ServicesSwiper
                  type='type1'
                  servicesCards={servicesList}
                  ServiceToRender={ServicesCard}
                />
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.services__cardsTablet}>
              {servicesList ? (
                <ServicesList cards={servicesList.slice(0, 4)} visual='brief' />
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.services__cardsDesktop}>
              {servicesList ? (
                <ServicesList cards={servicesList} visual='brief' />
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.services__viewAll}>
              <Link
                onClick={scrollPageUp}
                className={styles.services__viewAll_link}
                to='./services'
              >
                {t('home_services_view_all')}
              </Link>
            </div>
          </section>
        </div>

        <div className={styles.ourWorksWrapper}>
          <section className={styles.ourWorks}>
            <h2 className={styles.ourWorks__title}>{t('home_works_title')}</h2>

            <div className={styles.ourWorks__photo}>
              <img
                className={styles.ourWorks__photoItself}
                src={currentSong?.photo || './images/songs-photo.jpg'}
                alt='foto'
              />
            </div>

            {songsList ? (
              <div className={styles.ourWorks__list}>
                <SongsList tracks={shuffledSongs.slice(0, 2)} visual='strip' />
              </div>
            ) : (
              <div className={styles.ourWorks__list}>
                <Loader />
              </div>
            )}

            <Link
              onClick={scrollPageUp}
              to='./portfolio'
              className={styles.ourWorks__button}
            >
              <Button text={t('home_works_button')} />
            </Link>
          </section>
        </div>

        <div className={styles.bannerWrapper}>
          <section className={styles.banner}>
            <img
              className={styles.banner__star}
              src='./images/baner-star.png'
              alt='image-star'
            />

            <h2 className={`${styles.banner__text} ${styles.banner__text_1}`}>
              {t('home_banner1')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_2}`}>
              {t('home_banner2')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_3}`}>
              {t('home_banner3')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_4}`}>
              {t('home_banner4')}
            </h2>
          </section>
        </div>

        <div className={styles.lessonsWrapper}>
          <section className={styles.lessons}>
            {videosList ? (
              <>
                <h2 className={styles.lessons__title}>
                  {currenLanguage === 'ua'
                    ? guitarTeacherVideo?.title_uk
                    : guitarTeacherVideo?.title_en}
                </h2>

                <div className={styles.lessons__video}>
                  {guitarTeacherVideo && (
                    <VideoPlayer shownVideo={guitarTeacherVideo} />
                  )}
                </div>

                <h5
                  className={`${styles.lessons__desctiption} ${styles.lessons__desctiption_block1}`}
                >
                  {currenLanguage === 'ua'
                    ? guitarTeacherVideo?.description_blok1_uk
                    : guitarTeacherVideo?.description_blok1_en}
                </h5>

                <h5
                  className={`${styles.lessons__desctiption} ${styles.lessons__desctiption_block2}`}
                >
                  {currenLanguage === 'ua'
                    ? guitarTeacherVideo?.description_blok2_uk
                    : guitarTeacherVideo?.description_blok2_en}
                </h5>

                <div
                  onClick={handleTextMeClick}
                  className={styles.lessons__button}
                >
                  <Button text={t('home_lessons_button')} />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </section>
        </div>

        <div className={styles.equipmentWrapper}>
          <section className={styles.equipment}>
            <img
              className={`${styles.equipment__star} ${styles.equipment__star_star1}`}
              src='./images/equipment-white-star.png'
              alt='image-star'
            />

            <img
              className={`${styles.equipment__star} ${styles.equipment__star_star2}`}
              src='./images/equipment-white-star.png'
              alt='image-star'
            />

            <h2 className={styles.equipment__title}>
              {t('home_equipment_title')}
            </h2>

            <div className={styles.equipment__cardsPhone}>
              {equipmentList ? (
                <ServicesSwiper
                  type='type1'
                  equipmentCadrs={equipmentList}
                  EquipmentToRender={EquipmentCard}
                />
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.equipment__cardsTablet}>
              {equipmentList ? (
                <ServicesSwiper
                  type='type2'
                  equipmentCadrs={equipmentList}
                  EquipmentToRender={EquipmentCard}
                />
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.equipment__cardsDesktop}>
              {equipmentList ? (
                <EquipmentList cards={equipmentList.slice(0, 4)} />
              ) : (
                <Loader />
              )}
            </div>
          </section>
        </div>

        <div className={styles.testimonialsWrapper}>
          <section className={styles.testimonials}>
            <h2 className={styles.testimonials__title}>
              {t('home_testimonials_title')}
            </h2>

            <div className={styles.testimonials__blocksWrapper}>
              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block1}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block1}`}
                  src='./icons/white-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block1}`}
                  >
                    {t('home_testimonials_block1_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block1}`}
                    >
                      {t('home_testimonials_block1_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block1}`}
                    >
                      {t('home_testimonials_block1_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block1}`}
                  src='./images/section-testimonials/photo-block1.png'
                  alt='photo-persone'
                />
              </div>

              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block2}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block2}`}
                  src='./icons/pink-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block2}`}
                  >
                    {t('home_testimonials_block2_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block2}`}
                    >
                      {t('home_testimonials_block2_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block2}`}
                    >
                      {t('home_testimonials_block2_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block2}`}
                  src='./images/section-testimonials/photo-block2.png'
                  alt='photo-persone'
                />
              </div>

              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block3}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block3}`}
                  src='./icons/black-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block3}`}
                  >
                    {t('home_testimonials_block3_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block3}`}
                    >
                      {t('home_testimonials_block3_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block3}`}
                    >
                      {t('home_testimonials_block3_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block3}`}
                  src='./images/section-testimonials/photo-block3.png'
                  alt='photo-persone'
                />
              </div>
            </div>
          </section>
        </div>

        <ContactUs />

        <Footer />
      </div>
    </>
  );
};
