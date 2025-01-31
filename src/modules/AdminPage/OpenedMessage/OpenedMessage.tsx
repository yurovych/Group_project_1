import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsMessageOpened } from '../../../slices/booleanSlice';
import styles from './OpenedMessage.module.scss';
import { getTime } from './../../../helpers/getTime';
import { useTranslation } from 'react-i18next';

export const OpenedMessage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMessage = useAppSelector(
    (state) => state.current.currentMessage
  );

  function closeMessage() {
    dispatch(setIsMessageOpened(false));
  }

  return (
    <>
      <div onClick={closeMessage} className={styles.opened}></div>

      {currentMessage && (
        <div className={styles.opened__letter}>
          <p className={styles.opened__name}>{currentMessage.name}</p>
          <p className={styles.opened__message}>{currentMessage.message}</p>
          <p className={styles.opened__date}>{getTime(currentMessage)}</p>
          <a
            href={`mailto:${currentMessage.email}`}
            className={styles.opened__email}
          >
            {currentMessage?.email}
          </a>
          <a
            href={`tel:${currentMessage.phone_number}`}
            className={styles.opened__phone}
          >
            {currentMessage?.phone_number || '-'}
          </a>
          <div className={styles.opened__closeWrapper}>
            <button className={styles.opened__close} onClick={closeMessage}>
              {t('admin_page_message_close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
