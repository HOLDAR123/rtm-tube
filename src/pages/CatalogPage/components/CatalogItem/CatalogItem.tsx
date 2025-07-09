import {Link} from 'react-router-dom';

import styles from './CatalogItem.module.scss';
import {UserDto} from "../../../../api/users/dto/user.dto";
import {useFetchMyProfile} from "../../../../hooks/query/useFetchMyProfile";
import {useFetchSubscriptionsByUserId} from "../../../../hooks/query/useFetchSubscriptionsByUserId";
import classNames from "classnames";

interface CatalogItemProps {
  data: UserDto;
}

export default function CatalogItem({ data }: CatalogItemProps) {

  const {user} = useFetchMyProfile()
  const { subscriptionsChatData } = useFetchSubscriptionsByUserId(user?.id ?? -1)
  const isSubscribed = subscriptionsChatData?.some((item) => item.toUser.id === data.id);

    console.log(data.avatar)

    return (
    <div className={classNames(styles.card, { [styles.cardActive]: isSubscribed })}>
      <div className={styles.card__userInfo}>
        <div className={styles.card__avatarWrapper}>
          <img className={styles.card__avatar} src={data.avatar} alt="avatar" />
        </div>
        <p>{data.name}</p>
      </div>
      <div className={styles.card__content}>
          {data.description}
      </div>
      <Link to={`/catalog/${data.id}`} className="link" />
    </div>
  );
}
