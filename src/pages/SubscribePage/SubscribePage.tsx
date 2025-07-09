import {useState} from 'react';
import clsx from 'clsx';

import Button from 'components/UI/Button';
import {useFetchMyProfile} from 'hooks/query/useFetchMyProfile';


import styles from './SubscribePage.module.scss';
import {PlanEnum} from "../../types/interfaces/plan.enum";
import {useFetchBloggerPrices} from "../../hooks/query/useFetchBloggerPrices";
import {useParams} from "react-router-dom";
import {Price} from "../../api/subscriptions/dto/create-users-subscriptions-plan.dto";
import getInterval from "../../utils/SubscriptionInterval";
import {
  useMutationCreateSubscription
} from "../../hooks/mutations/useMutationCreateSubscription";
import {useFetchBlogger} from "../../hooks/query/useFetchBlogger";

export default function SubscribePage() {
  const [activeRate, setActiveRate] = useState<PlanEnum>(PlanEnum.WEEKLY);

  const { id } = useParams();

  const { user } = useFetchMyProfile();

  const {blogger} = useFetchBlogger(Number(id) ?? -1)

  console.log('blogger', blogger)

  const { prices } = useFetchBloggerPrices(Number(id));

  const { createSubscription} = useMutationCreateSubscription();

  const changeValueRate = (plan: PlanEnum) => {
    setActiveRate(plan);
  };

  const handleSubscribe = async () => {
    const appropriateData = prices?.data?.find((item: Price) => item.plan === activeRate);

    if (appropriateData && user) {
      createSubscription({
        userId: user.id,
        toUserId: Number(id),
        planId: appropriateData.id
      });
    }
  };

  const sortedPrices = prices?.data?.sort((a: Price, b: Price) => {
    const order = [PlanEnum.WEEKLY, PlanEnum.MONTHLY, PlanEnum.YEARLY];
    return order.indexOf(a.plan) - order.indexOf(b.plan);
  });

  return (
      <section className={styles.subscribe}>
        <div className={clsx('container', styles.content)}>
          <div className={styles.subscribe__imageWrapper}>
            <img src={blogger?.avatar} alt="avatar" />
          </div>
          <h2 className={styles.subscribe__name}>{blogger?.name}</h2>
          <div className={styles.subscribe__description}>
            <p>
              {blogger?.description}
            </p>
          </div>

          {true ? (
              <>
                <div className={styles.subscribe__rates}>
                  {sortedPrices?.map((item: Price) => (
                      <Button
                          variants={activeRate === item.plan ? 'filled' : 'transparent'}
                          key={item.plan}
                          className={clsx(styles.rate, {
                            [styles.border]: activeRate !== item.plan,
                          })}
                          onClick={() => changeValueRate(item.plan)}
                      >
                  <span className={styles.rate__text}>
                    {item.price}$ / {getInterval(item.plan)}
                  </span>
                      </Button>
                  ))}
                </div>

                <Button
                    variants="filled"
                    onClick={handleSubscribe}
                    className={styles.subscribe__button}
                >
                  Start chatting
                </Button>
              </>
          ) : (
              <Button
                  variants="filled"
                  onClick={handleSubscribe}
                  className={styles.subscribe__button}
              >
                Send a message
              </Button>
          )}
        </div>
      </section>
  );
}