import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCookie } from 'cookies-next';
import socketio, { io, Socket } from 'socket.io-client';
import store from 'store';

import { EventsSocketEnum } from 'types/interfaces/eventsSockets.enum';

const connectSocket = () => {
  const token = getCookie('token');

  const URL = process.env.REACT_APP_SOCKET_URI || 'http://localhost:8080';

  const socket = io(URL, {
    auth: { token },
  });

  socket.on(EventsSocketEnum.CONNECTED_EVENT, () => {
    console.log('Connected');
  });
  socket.on(EventsSocketEnum.JOIN_CHAT_EVENT, () => {
    console.log('User joined the chat');
  });

  return socket;
};

const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    auth: { isAuthInitialized },
  } = store.getState();

  useEffect(() => {
    if (isAuthInitialized) {
      if (!socket) {
        connectSocket();
      }

      setSocket(connectSocket());
    }
  }, [isAuthInitialized]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
