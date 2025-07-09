import { useState, useEffect } from 'react';

import Button from 'components/UI/Button';
import UploadsAudioAiStudy from 'components/UploadsAudioAiStudy';
import UploadsPhotoAiStudy from 'components/UploadsPhotoAiStudy';

import styles from './EditAiModel.module.scss';
import { useMutationUpdateMessageBot } from '../../hooks/mutations/useMutationUpdateMessageBot';
import { useFetchMyProfile } from '../../hooks/query/useFetchMyProfile';
import { useFetchBotSettingsByUserId } from '../../hooks/query/useFetchBotSettingsByUserId';
import Toasts from "../../utils/Toasts";

export default function EditAiModel() {
  const { user } = useFetchMyProfile();
  const { updateMessageBotSettings } = useMutationUpdateMessageBot();
  const { messageBotSettingsData } = useFetchBotSettingsByUserId(user?.id ?? -1);

  const [text, setText] = useState('');
  const [images, setImages] = useState<(File | string)[] | null>(null);
  const [audios, setAudios] = useState<(File | string)[] | null>(null);

  useEffect(() => {
    if (messageBotSettingsData) {
      setText(messageBotSettingsData.text || '');
      setImages(messageBotSettingsData.images ?? null);
      setAudios(messageBotSettingsData.audios ?? null);
    }
  }, [messageBotSettingsData]);

  const formatFiles = (files: (File | string | undefined)[] | null) =>
      files?.map((file) => (typeof file === 'string' ? file.split('/').pop() : file))
          .filter((file): file is File | string => file !== undefined) ?? [];

  const handleSave = () => {
    if (user) {
      updateMessageBotSettings({
        userId: user.id,
        dto: { text },
        images: formatFiles(images),
        audios: formatFiles(audios),
      });
      Toasts.success("Successfully updated AiSettings");
    }
  };

  return (
      <div className={styles.edit}>
        <div className={styles.description}>
          <h3 className={styles.description__title}>Model description</h3>
          <label className={styles.description__label}>
          <textarea
              placeholder="Describe your model's communication style..."
              className={styles.description__textarea}
              value={text}
              onChange={(event) => setText(event.target.value)}
          />
            <Button variants="filled" className={styles.description__button} onClick={handleSave}>
              Save
            </Button>
          </label>
        </div>
        <UploadsPhotoAiStudy
            files={images}
            setFiles={(newFiles) => setImages(newFiles)}
        />
        <UploadsAudioAiStudy
            files={audios}
            setFiles={(newFiles) => setAudios(newFiles)} />
      </div>
  );
}
