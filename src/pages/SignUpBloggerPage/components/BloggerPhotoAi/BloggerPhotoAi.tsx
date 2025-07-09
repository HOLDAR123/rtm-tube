import UploadsPhotoAiStudy from 'components/UploadsPhotoAiStudy';
import { SignUpTabsType } from 'pages/SignUpBloggerPage/SignUpBloggerPage';
import SignUpFooter from '../SignUpFooter';

import styles from './BloggerPhotoAi.module.scss';
import { useMutationUpdateMessageBot } from '../../../../hooks/mutations/useMutationUpdateMessageBot';
import { useFetchMyProfile } from '../../../../hooks/query/useFetchMyProfile';
import { useState } from 'react';

interface BloggerPhotoAiProps {
    setTabs: (value: SignUpTabsType) => void;
}

export default function BloggerPhotoAi({ setTabs }: BloggerPhotoAiProps) {
    const [files, setFiles] = useState<(File | string)[] | null>(null);

    const { updateMessageBotSettings } = useMutationUpdateMessageBot();
    const { user } = useFetchMyProfile();

    const handleUpload = () => {
        if (!files || !user) return;

        updateMessageBotSettings({
            userId: user.id,
            dto: {},
            images: files.filter((file): file is File => file instanceof File),
            audios: [],
        });

        setTabs('audio');
    };

    return (
        <>
            <h2 className={styles.title}>Customize your AI</h2>
            <div className={styles.content}>
                <UploadsPhotoAiStudy
                    files={files?.filter((file) => file instanceof File) as File[] | null}
                    setFiles={(newFiles) => setFiles(newFiles)}
                />
            </div>
            <SignUpFooter onClick={handleUpload} />
        </>
    );
}