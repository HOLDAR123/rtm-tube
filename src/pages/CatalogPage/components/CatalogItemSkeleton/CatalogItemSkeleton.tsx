import styles from './CatalogItemSkeleton.module.scss';

interface CatalogItemSkeletonProps {}

export default function CatalogItemSkeleton({}: CatalogItemSkeletonProps) {
  return <div className={styles.card}></div>;
}
