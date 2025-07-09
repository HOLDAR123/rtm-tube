import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/UI/Button';
import AddIcon from 'assets/icons/AddIcon';
import PanelItem from '../PanelItem';

import styles from './ChatsPanel.module.scss';
import {GetSubscriptionsByIdDto} from "../../../../api/subscriptions/dto/getSubscriptionsById.dto";

interface Props {
    data: GetSubscriptionsByIdDto[] | undefined
}

export default function ChatsPanel({data}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  console.log(data)

  return (
    <div className={styles.panel}>
      <div className={styles.panel__header}>
        <h4 className={styles.panel__title}>Chats</h4>
        <Button variants="filled" className={styles.panel__add}>
          <AddIcon />
          <Link to="/catalog" className="link" />
        </Button>
      </div>
      <div className={styles.panel__list}>
          {data && data.map((item, index) => (
              <PanelItem data={item.toUser} key={index} />
          ))}
      </div>
    </div>
  );
}
