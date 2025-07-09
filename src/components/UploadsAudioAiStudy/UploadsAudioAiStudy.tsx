import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import UploadFileInput from 'components/UI/UploadFileInput';
import AudioElem from 'pages/ChatPage/components/AudioElem';
import DeleteIcon from 'assets/icons/DeleteIcon';
import ScrollIcon from 'assets/icons/ScrollIcon';

import styles from './UploadsAudioAiStudy.module.scss';

interface UploadsAudioAiStudyProps {
  files: (File | string)[] | null;
  setFiles: React.Dispatch<React.SetStateAction<(File | string)[] | null>>;
}

export default function UploadsAudioAiStudy({ files, setFiles }: UploadsAudioAiStudyProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const prevAudioRef = useRef<WaveSurfer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files!);
    setFiles((prev) => (prev ? [...prev, ...newFiles] : newFiles));
  };

  const audioFiles = useMemo(() => {
    if (!files) return [];
    return files.map((file) => ({
      url: typeof file === 'string' ? file : URL.createObjectURL(file),
      name: typeof file === 'string' ? file : file.name,
      size: typeof file === 'string' ? 0 : file.size,
    }));
  }, [files]);

  const handleDelete = useCallback((index: number) => {
    setFiles((prev) => prev?.filter((_, i) => i !== index) ?? null);
  }, []);

  const checkScroll = () => {
    if (scrollWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollWrapperRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollWrapperRef.current) {
      const { scrollLeft } = scrollWrapperRef.current;
      const newScrollLeft = direction === 'left' ? scrollLeft - 500 : scrollLeft + 500;
      scrollWrapperRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [audioFiles]);

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.addEventListener('scroll', checkScroll);
      return () => scrollWrapperRef.current?.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
      <div className={styles.uploads}>
        <h2 className={styles.uploads__title}>Upload up to 10 audio to train the AI model</h2>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
          <div className={styles.uploads__files}>
            <UploadFileInput onChange={handleChange} multiple accept="audio/*" />
            {audioFiles.map((audio, index) => (
                <div key={index} className={styles.audioWrapper}>
                  <div className={styles.audioWrapper__header}>
                    <p className={styles.audioWrapper__title}>Audio {index + 1}</p>
                    <button onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </button>
                  </div>
                  <AudioElem prevAudio={prevAudioRef} url={audio.url} size={audio.size} />
                </div>
            ))}
          </div>
        </div>
        {canScrollLeft && (
            <button className={styles.leftButton} onClick={() => handleScroll('left')}>
              <ScrollIcon width={16} height={16} />
            </button>
        )}
        {canScrollRight && (
            <button className={styles.rightButton} onClick={() => handleScroll('right')}>
              <ScrollIcon width={16} height={16} />
            </button>
        )}
      </div>
  );
}