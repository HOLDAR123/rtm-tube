export enum EventsSocketEnum {
  JOIN_CHAT_EVENT = 'join_chat',
  SEND_MESSAGE_EVENT = 'send_message',
  UPDATE_MESSAGE_EVENT = 'update_message',
  DELETE_MESSAGE_EVENT = 'delete_message',
  MESSAGE_SENT_EVENT = 'message_sent',
  MESSAGE_UPDATED_EVENT = 'message_updated',
  MESSAGE_DELETED_EVENT = 'message_deleted',
  TYPING_EVENT = 'typing',
  STOP_TYPING_EVENT = 'stop_typing',
  CONNECTED_EVENT = 'connected',
  SOCKET_ERROR_EVENT = 'socket_error',
}
