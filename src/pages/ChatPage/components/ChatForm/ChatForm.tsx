import { FormEvent, useRef, useState } from 'react';

import Button from 'components/UI/Button';
import { useSocket } from 'providers/SocketProvider';
import { UserDto } from 'api/users/dto/user.dto';
import { EventsSocketEnum } from 'types/interfaces/eventsSockets.enum';
import AttachIcon from 'assets/icons/AttachIcon';
import SendIcon from 'assets/icons/SendIcon';

import styles from './ChatForm.module.scss';
import {useParams} from "react-router-dom";

interface ChatFormProps {
  user: UserDto | undefined;
}

export default function ChatForm({ user }: ChatFormProps) {
  const { socket } = useSocket();
  const [text, setText] = useState('');
  const {id} = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (text.trim() === '' || !user || !socket) {
      return;
    }
    socket.emit(EventsSocketEnum.STOP_TYPING_EVENT, Number(id));

    socket.emit(EventsSocketEnum.SEND_MESSAGE_EVENT, {
      recipientId: Number(id),
      senderId: user.id,
      receiveOnly: "text",
      text,
    });
    setText('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scHeight = event.target.scrollHeight;

    textarea.style.height = `${scHeight}px`;

    if (event.target.value.trim()) {
      socket!.emit(EventsSocketEnum.TYPING_EVENT, Number(id));
    } else {
      socket!.emit(EventsSocketEnum.STOP_TYPING_EVENT, Number(id));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Button variants="transparent" className={styles.form__attach}>
        <AttachIcon />
      </Button>
      <textarea
        className={styles.form__textarea}
        placeholder="Write message text..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        rows={1}
      />
      <Button type="submit" variants="filled" className={styles.form__send}>
        <SendIcon />
      </Button>
    </form>
  );
}
