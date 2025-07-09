import { useState } from 'react';
import clsx from 'clsx';

import BloggerAudioAi from './components/BloggerAudioAi';
import BloggerPhotoAi from './components/BloggerPhotoAi';
import BloggerStudyAi from './components/BloggerStudyAi';
import SignUpBloggerForm from './components/SignUpBloggerForms';

import styles from './SignUpBloggerPage.module.scss';

export type SignUpTabsType = 'default' | 'study' | 'photo' | 'audio';

export default function SignUpBloggerPage() {
  const [tabs, setTabs] = useState<SignUpTabsType>('default');
  return (
    <div className={styles.signUp}>
      <div
        className={clsx(styles.container, {
          [styles.width]: tabs === 'photo' || tabs === 'audio',
        })}
      >
        {tabs === 'default' && (
          <>
            <h2 className={styles.signUp__title}>Signup</h2>
            <SignUpBloggerForm setTabs={setTabs} />
          </>
        )}
        {tabs === 'study' && <BloggerStudyAi setTabs={setTabs} />}
        {tabs === 'photo' && <BloggerPhotoAi setTabs={setTabs} />}
        {tabs === 'audio' && <BloggerAudioAi />}
      </div>
    </div>
  );
}
