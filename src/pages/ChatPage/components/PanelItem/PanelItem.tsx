import clsx from 'clsx';

import styles from './PanelItem.module.scss';
import {UserDto} from "../../../../api/users/dto/user.dto";
import {Link, useParams} from "react-router-dom";

interface PanelItemProps {
  data: UserDto
}

export default function PanelItem({ data}: PanelItemProps) {
  const {id} = useParams()

  const bloggerId = id ?? -1
  return (
    <div
      className={clsx(styles.item, {
        [styles.active]:  data.id === Number(bloggerId),
      })}
    >
      <div className={styles.item__header}>
        <div className={styles.item__avatar}>
          <img src={data.avatar} alt="avatar" />
        </div>
        <h4 className={styles.item__name}>{data.name}</h4>
      </div>
      <div className={styles.item__desc}>
        {data.description}
      </div>
      <Link to={`/${data.id}`} className={styles.item_link} />
    </div>
  );
}
