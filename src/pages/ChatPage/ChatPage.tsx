import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import WaveSurfer from 'wavesurfer.js';

import Button from 'components/UI/Button';
import { useSocket } from 'providers/SocketProvider';
import useFetchMyChat from 'hooks/query/useFetchMyChat';
import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { IMessage } from 'types/Chat.type';
import { EventsSocketEnum } from 'types/interfaces/eventsSockets.enum';
import { formatDateToTime } from 'utils/formatDate';
import ScrollIcon from 'assets/icons/ScrollIcon';
import AudioElem from './components/AudioElem';
import ChatForm from './components/ChatForm';
import ChatsPanel from './components/ChatsPanel';

import styles from './ChatPage.module.scss';
import {useFetchSubscriptionsByUserId} from "../../hooks/query/useFetchSubscriptionsByUserId";
import {useParams} from "react-router-dom";
import LoaderIcon from "../../assets/icons/LoaderIcon";

export default function ChatPage() {
  const { socket } = useSocket();
  const { id } = useParams();
  const { user } = useFetchMyProfile();
  const { data: chat } = useFetchMyChat(Number(id));
  const prevAudioRef = useRef<WaveSurfer | null>(null);

  const [messages, setMessages] = useState<IMessage[]>(chat || []);

  const { subscriptionsChatData } = useFetchSubscriptionsByUserId(user?.id ?? -1);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isArrowActive, setIsArrowActive] = useState(false);

  useEffect(() => {
    if (chat && user) {
      setMessages(chat.filter((message: IMessage) =>
          message.recipient?.id === user.id || message.sender?.id === user.id
      ));
    }
  }, [chat, user]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
      setIsArrowActive(false);
      setTimeout(() => {
        if (messageEndRef.current) {
          messageEndRef.current.style.scrollBehavior = 'smooth';
        }
      }, 1000);
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !user) return;

    const handleMessageReceived = (message: IMessage) => {
      if (message.recipient?.id === user.id || message.sender?.id === user.id) {
        setMessages((prevMessages) => {
          const isMessageExists = prevMessages.some((msg) => msg.id === message.id);
          return isMessageExists ? prevMessages : [...prevMessages, message];
        });
      }
    };

    socket.on(EventsSocketEnum.MESSAGE_SENT_EVENT, handleMessageReceived);

    return () => {
      socket.off(EventsSocketEnum.MESSAGE_SENT_EVENT, handleMessageReceived);
    };
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;

    const handleMessageUpdated = (updatedMessage: IMessage) => {
      console.log("Получено обновлённое сообщение:", updatedMessage);

      setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    };

    socket.on(EventsSocketEnum.MESSAGE_UPDATED_EVENT, handleMessageUpdated);

    return () => {
      socket.off(EventsSocketEnum.MESSAGE_UPDATED_EVENT, handleMessageUpdated);
    };
  }, [socket]);

  useEffect(() => {
    const handleResize = () => {
      if (messageEndRef.current) {
        const scrollTop = messageEndRef.current.scrollTop;
        const scrollHeight = messageEndRef.current.scrollHeight;
        const offsetHeight = messageEndRef.current.offsetHeight;

        setIsArrowActive(scrollTop < scrollHeight - offsetHeight - 100);
      }
    };

    window.addEventListener('wheel', handleResize);
    return () => {
      window.removeEventListener('wheel', handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
      setIsArrowActive(false);
    }
  };

  console.log(messages)

  return (
    <section className={styles.chats}>
      <div className={clsx('container', styles.container)}>
        <ChatsPanel data={subscriptionsChatData}/>
        <div className={styles.chats__right}>
          <div className={styles.wrapper} ref={messageEndRef}>
            <div className={styles.messages}>
              {messages.map((message) => (
                  <div
                      className={clsx(
                          styles.message,
                          message.sender?.id === user?.id && styles.isSender,
                          message.sender?.id === Number(id) && styles.isReceiver,
                          !message.sender?.id && styles.isReceiver,
                      )}
                      key={message.id}
                  >
                    {message.status === 'pending' && <LoaderIcon/>}
                    {message.audio ? (
                        <AudioElem
                            prevAudio={prevAudioRef}
                            url={`${process.env.REACT_APP_API_ENDPOINT}/files/audio/${message.audio}`}
                            isChat
                        />
                    ) : (
                        <>
                          <div className={styles.message__text}>{message.text}</div>
                          <div className={styles.message__time}>
                            {formatDateToTime(message.created_at)}
                          </div>
                        </>
                    )}
                  </div>
              ))}
            </div>
            <Button
              className={clsx(
                styles.scrollButton,
                isArrowActive && styles.scrollActive,
              )}
              onClick={handleScroll}
            >
              <ScrollIcon />
            </Button>
          </div>
          <ChatForm user={user} />
        </div>
      </div>
    </section>
  );
}
