import clsx from 'clsx';

import Button from 'components/UI/Button';
import SearchIcon from 'assets/icons/SearchIcon';

import styles from './SubscriptionsPage.module.scss';
import {useMutationCancelSubscription} from "../../hooks/mutations/useMutationCancelSubscription";
import {useFetchMyProfile} from "../../hooks/query/useFetchMyProfile";
import {useFetchSubscriptionsByUserId} from "../../hooks/query/useFetchSubscriptionsByUserId";
import getInterval from "../../utils/SubscriptionInterval";
import Toasts from "../../utils/Toasts";

export default function SubscriptionsPage() {

  const {user} = useFetchMyProfile()
  const { cancelSubscription } = useMutationCancelSubscription();

  const { subscriptionsChatData } = useFetchSubscriptionsByUserId(user?.id ?? -1)

  const cancelSubscriptionBlogger = (userId:number, bloggerId: number) => {
    if(userId && bloggerId){
      cancelSubscription({userId, bloggerId})
      Toasts.success("Subscription successfully canceled");
    }
  }

  return (
    <div className={styles.subscriptions}>
      <div className={clsx('container', styles.container)}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter name..."
          />
          <Button variants="filled" className={styles.search}>
            <SearchIcon />
          </Button>
        </label>
        <div className={styles.cards}>
          {subscriptionsChatData && subscriptionsChatData.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.card__info}>
                <div className={styles.card__imageWrapper}>
                  <img src={item.toUser.avatar} alt="avatar" />
                </div>
                <p className={styles.card__name}>{item.toUser.name}</p>
              </div>
              <div className={styles.card__actions}>
                <div className={styles.card__price}>{item.plan.price}₽ / {getInterval(item.plan.plan)}</div>
                <Button className={styles.card__button} onClick={() => cancelSubscriptionBlogger(item.user.id, item.toUser.id)} variants="red">
                  Cancel subscription
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
