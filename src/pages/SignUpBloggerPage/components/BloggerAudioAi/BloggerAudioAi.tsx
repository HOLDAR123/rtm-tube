import { useNavigate } from 'react-router-dom';

import UploadsAudioAiStudy from 'components/UploadsAudioAiStudy';
import SignUpFooter from '../SignUpFooter';

import styles from './BloggerAudioAi.module.scss';
import {useState} from "react";
import {useMutationUpdateMessageBot} from "../../../../hooks/mutations/useMutationUpdateMessageBot";
import {useFetchMyProfile} from "../../../../hooks/query/useFetchMyProfile";

export default function BloggerAudioAi() {

    const [files, setFiles] = useState<(File | string)[] | null>(null);

    const { updateMessageBotSettings } = useMutationUpdateMessageBot();
    const { user } = useFetchMyProfile();

    const handleUpload = () => {
        if (!files || !user) return;

        updateMessageBotSettings({
            userId: user.id,
            dto: {},
            audios: files?.filter((file): file is File => file instanceof File) || [],
        });
        navigate('/settings')
    };

  const navigate = useNavigate();

  return (
    <>
      <h2 className={styles.title}>Customize your AI</h2>
      <div className={styles.content}>
          <UploadsAudioAiStudy
              files={files?.filter((file) => file instanceof File) as File[] | null}
              setFiles={(newFiles) => setFiles(newFiles)}
          />
      </div>
      <SignUpFooter onClick={handleUpload} text='Finish'/>
    </>
  );
}
