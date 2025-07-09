import { MutableRefObject, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import Button from 'components/UI/Button';
import { formatBytes } from 'utils/formatBytes';
import { formatTime } from 'utils/formatTime';
import PauseIcon from 'assets/icons/PauseIcon';
import PlayIcon from 'assets/icons/PlayIcon';

import styles from './AudioElem.module.scss';

interface AudioElemProps {
  url: string;
  prevAudio: MutableRefObject<WaveSurfer | null>;
  size?: number;
  isChat?: boolean;
}

export default function AudioElem({
  url,
  prevAudio,
  size = 100000,
  isChat = undefined,
}: AudioElemProps) {
  const [audioStats, setAudioStats] = useState({
    duration: 0,
    currentTime: 0,
    size: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      const waveColor = getComputedStyle(waveformRef.current)
        .getPropertyValue('color')
        .trim();

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F5157',
        progressColor: waveColor,
        cursorColor: 'transparent',
        height: 30,
        barWidth: 1,
        barGap: 3,
        url,
      });
      wavesurferRef.current.setVolume(0.1);

      wavesurferRef.current.on('ready', () => {
        setIsPlaying(false);
        setAudioStats((prevStats) => ({
          ...prevStats,
          duration: wavesurferRef.current!.getDuration(),
        }));
      });

      wavesurferRef.current.on('audioprocess', () => {
        setAudioStats((prevStats) => ({
          ...prevStats,
          currentTime: wavesurferRef.current!.getCurrentTime(),
        }));
      });

      wavesurferRef.current.on('pause', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        if (prevAudio.current) {
          prevAudio.current.pause();
          prevAudio.current = null;
        }
        wavesurferRef.current.play();
        prevAudio.current = wavesurferRef.current;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.audio}>
      <div className={styles.header}>
        <Button onClick={handlePlayPause} className={styles.button}>
          {isPlaying ? (
            <PauseIcon width={24} height={24} />
          ) : (
            <PlayIcon width={24} height={24} />
          )}
        </Button>
        <div ref={waveformRef} className={styles.waveform} />
        <div className={styles.info}>
          <span>
            {audioStats.currentTime
              ? formatTime(audioStats.currentTime)
              : formatTime(audioStats.duration)}
          </span>
          <span>{formatBytes(size)}</span>
        </div>
      </div>
      {isChat && <div className={styles.created}>19:36</div>}
    </div>
  );
}
