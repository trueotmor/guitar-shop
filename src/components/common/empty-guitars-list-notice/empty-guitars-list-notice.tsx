import styles from '../empty-guitars-list-notice/empty-guitars-list-notice.module.scss';

type Props = {
  notice: string;
};

function EmptyGuitarsListNotice({ notice }: Props) {
  return <p className={styles.notice}>{notice}</p>;
}

export default EmptyGuitarsListNotice;
