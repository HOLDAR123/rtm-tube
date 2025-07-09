import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  CreateSubscriptionPriceDto,
  Price,
} from 'api/subscriptions/dto/create-users-subscriptions-plan.dto';
import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { useFetchBloggerPrices } from '../../../hooks/query/useFetchBloggerPrices';
import { SUBSCRIPTIONLIST, subscriptionTitle } from 'constants/setting';
import styles from './EditSubscription.module.scss';
import SubscriptionsMethods from '../../../api/subscriptions/SubscriptionsMethods';
import { PlanEnum } from "../../../types/interfaces/plan.enum";
import Button from "../../UI/Button";
import clsx from "clsx";
import Toasts from "../../../utils/Toasts";

export default function EditSubscription() {
  const { user } = useFetchMyProfile();
  const [value, setValue] = useState<Record<'WEEKLY' | 'MONTHLY' | 'YEARLY', string>>({
    WEEKLY: '',
    MONTHLY: '',
    YEARLY: '',
  });

  const { prices } = useFetchBloggerPrices(user?.id ?? -1);
  const [initialValues, setInitialValues] = useState<Record<'WEEKLY' | 'MONTHLY' | 'YEARLY', string>>({
    WEEKLY: '',
    MONTHLY: '',
    YEARLY: '',
  });

  const subscriptions = useMemo(() => {
    if (!prices?.data) return SUBSCRIPTIONLIST;

    const backendMap = (prices?.data as Price[]).reduce<Record<string, Price>>((acc, item) => {
      acc[item.plan] = item;
      return acc;
    }, {});

    const merged = SUBSCRIPTIONLIST.map(
        (frontItem) => backendMap[frontItem.plan] || frontItem,
    );

    const remainingBackendItems = prices.data.filter((backItem: Price) => {
      return !SUBSCRIPTIONLIST.some(
          (frontItem) => frontItem.plan === backItem.plan,
      );
    });

    return [...merged, ...remainingBackendItems];
  }, [prices]);

  useEffect(() => {
    if (prices?.data) {
      const newValue = prices.data.reduce((acc: Record<string, string>, item: Price) => {
        acc[item.plan] = item.price;
        return acc;
      }, {});
      setValue((prevValue) => ({ ...prevValue, ...newValue }));
      setInitialValues(newValue);
    }
  }, [prices]);

  const handleSaveAllPrices = useCallback(async () => {
    if (!user) return;

    try {
      const data: CreateSubscriptionPriceDto = {
        bloggerId: user.id,
        prices: Object.entries(value).map(([plan, price]) => ({
          plan: plan as PlanEnum,
          price: +price,
        })),
      };

      await SubscriptionsMethods.createOrUpdatePrices(data);

      Toasts.success("Successfully updated subscription");
    } catch (error) {
      Toasts.error('Error saving prices:');
    }
  }, [user, value]);

  const isDataChanged = Object.entries(value).some(([plan, price]) => initialValues[plan as keyof typeof initialValues] !== price);

  const classNameButton = clsx(
      styles.edit__saveButton,
      isDataChanged && styles.edit__saveButton_active,
      !isDataChanged && styles.edit__saveButton_disabled,
  )

  return (
      <div className={styles.edit}>
        <h2 className={styles.edit__title}>Edit subscription</h2>
        <div className={styles.edit__content}>
          {subscriptions.map((elem) => (
              <div key={elem.id} className={styles.item}>
            <span className={styles.item__title}>
              {subscriptionTitle[elem.plan as keyof typeof subscriptionTitle]}
            </span>
                <label className={styles.item__label}>
                  <input
                      type="number"
                      className={styles.item__input}
                      placeholder="0"
                      value={+value[elem.plan as keyof typeof value] || 0}
                      onChange={(event) => {
                        setValue({
                          ...value,
                          [elem.plan]: event.target.value,
                        });
                      }}
                  />
                  <span className={styles.item__currency}>$</span>
                </label>
              </div>
          ))}
        </div>
        <button
            className={classNameButton}
            onClick={handleSaveAllPrices}
            disabled={!isDataChanged}
        >
          Save
        </button>
      </div>
  );
}