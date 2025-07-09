import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import UploadFileInput from 'components/UI/UploadFileInput';
import DeleteIcon from 'assets/icons/DeleteIcon';
import ScrollIcon from 'assets/icons/ScrollIcon';

import styles from './UploadsPhotoAiStudy.module.scss';

interface UploadsPhotoAiStudyProps {
  files: (File | string)[] | null;
  setFiles: React.Dispatch<React.SetStateAction<(File | string)[] | null>>;
}

export default function UploadsPhotoAiStudy({ setFiles, files }: UploadsPhotoAiStudyProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files!);
    setFiles((prev) => (prev ? [...prev, ...newFiles] : newFiles));
  };

  const urls = useMemo(() => {
    if (!files) return [];
    return files.map((file) => (typeof file === 'string' ? file : URL.createObjectURL(file)));
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
      const newScrollLeft =
          direction === 'left' ? scrollLeft - 500 : scrollLeft + 500;
      scrollWrapperRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [urls]);

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.addEventListener('scroll', checkScroll);
      return () => scrollWrapperRef.current?.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
      <div className={styles.uploads}>
        <h2 className={styles.uploads__title}>Upload up to 10 photos to train the AI model</h2>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
          <div className={styles.uploads__files}>
            <UploadFileInput onChange={handleChange} multiple accept="image/*" />
            {urls.map((url, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <div className={styles.imageWrapper__header}>
                    <button onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </button>
                  </div>
                  <img src={url} className={styles.image} alt={`Uploaded ${index}`} />
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