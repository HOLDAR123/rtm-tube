import React from 'react';
import clsx from 'clsx';

import Button from 'components/UI/Button';
import SearchIcon from 'assets/icons/SearchIcon';
import CatalogItem from './components/CatalogItem';
import CatalogItemSkeleton from './components/CatalogItemSkeleton';

import styles from './CatalogPage.module.scss';
import {useFetchSubscriptions} from "../../hooks/query/useFetchSubscriptions";

function CatalogPage() {

  const {subscriptionsData, isLoading} = useFetchSubscriptions()
  const filteredSubscriptions = subscriptionsData?.filter(
      (item, index, self) =>
          self.findIndex(sub => sub.creator.id === item.creator.id) === index
  );


  return (
    <div className={styles.catalog}>
      <div className={clsx('container', styles.content)}>
        <div className={styles.catalog__wrapper}>
          <label className={styles.catalog__inputWrapper}>
            <input
              className={styles.catalog__input}
              type="text"
              placeholder="Search"
            />
            <Button variants="filled" className={styles.catalog__searchBtn}>
              <SearchIcon />
            </Button>
          </label>
          <div className={styles.cards}>
            {filteredSubscriptions?.map((item , index) =>
                isLoading ? (
                <CatalogItemSkeleton />
            ) : (
                <CatalogItem key={index} data={item.creator} />
            ),)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
