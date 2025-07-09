import Button from 'components/UI/Button';
import useCopy from 'hooks/useCopy';

import styles from './Referral.module.scss';
import {useFetchMyProfile} from "../../../hooks/query/useFetchMyProfile";
import {useFetchReferrals} from "../../../hooks/query/useFetchReferrals";


export default function Referral() {
    const {user} = useFetchMyProfile()
    const {referrals} = useFetchReferrals(user?.id ?? 0)
    const text = `${process.env.REACT_APP_API_ENDPOINT}/${user?.referralCode}`;
    const { handleCopy, isCopied } = useCopy(text ?? '');

    return (
        <div className={styles.referral}>
            <div className={styles.referral__header}>
                <h2 className={styles.title}>Referral program</h2>
                <div className={styles.referral__link}>
                    <p className={styles.referral__text}>{text}</p>
                    <Button
                        variants="filled"
                        className={styles.referral__button}
                        onClick={handleCopy}
                    >
                        {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
            </div>
            <div className={styles.referral__invited}>
                <h3 className={styles.title}>Invited users</h3>
                <div className={styles.cards}>
                    {referrals && referrals.map((referral, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.card__name}>{referral.email}</div>
                            <span className={styles.card__bonus}>50₽</span>
                        </div>
                    ))
                    }

                </div>
            </div>
        </div>
    );
}
