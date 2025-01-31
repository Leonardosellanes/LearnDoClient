import { createSlice, current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  chats: [],
  isLoading: false,
  activeChatId: null,
  temporalMessages: [],
};

export const ChatsSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    setChats(state, { payload }) {
      state.chats = payload;
    },
    addChat(state, { payload }) {
      state.chats.push(payload);
    },
    setChatId(state, { payload }) {
      state.activeChatId = payload;
    },
    addMessage(state, { payload }) {
      const chatId = payload?.chatId;
      const newMessage = payload?.message;

      state.chats = current(state?.chats)?.map((item) => {
        if (item?.chatId === chatId) {
          return {
            ...item,
            messages: [...item?.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return item;
      });
    },
    changeIsRead(state, { payload }) {
      const chatId = payload?.chatId;
      const newVal = payload?.value;
      console.log("payload is", payload);

      state.chats = current(state?.chats)?.map((item) => {
        if (item?.chatId === chatId) {
          return {
            ...item,
            lastMessage: {
              ...item?.lastMessage,
              isRead: newVal === true ? "1" : 0,
            },
          };
        }
        return item;
      });
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    addTemporalMessage(state, { payload }) {
      const exists = current(state?.temporalMessages)?.find(
        (item) => item?.id === payload?.id
      );
      if (!exists) {
        state.temporalMessages.push(payload);
      }
    },
    removeTemporalMessage(state, { payload }) {
      state.temporalMessages = current(state?.temporalMessages)?.filter(
        (item) => item?.id != payload
      );
    },
  },
  extraReducers: {},
});

export const useChatsSlice = () => {
  const dispatch = useDispatch();

  const handleSetChats = (data) => {
    dispatch(ChatsSlice.actions.setChats(data));
  };

  const handleAddChat = (data) => {
    dispatch(ChatsSlice.actions.addChat(data));
  };

  const handleAddMessage = (data) => {
    dispatch(ChatsSlice.actions.addMessage(data));
  };

  const handleSetChatId = (chatId) => {
    dispatch(ChatsSlice.actions.setChatId(chatId));
  };

  const handleChangeIsRead = (data) => {
    dispatch(ChatsSlice.actions.changeIsRead(data));
  };

  const removeTemporalMessage = (id) => {
    dispatch(ChatsSlice.actions.removeTemporalMessage(id));
  };

  const handleAddTemporalMessage = (data) => {
    console.log("me llaman 1")
    dispatch(ChatsSlice.actions.addTemporalMessage(data));

    setTimeout(() => {
      removeTemporalMessage(data?.id)
    }, 5000)
  };

  return {
    handleSetChats,
    handleAddChat,
    handleAddMessage,
    handleSetChatId,
    handleChangeIsRead,
    removeTemporalMessage,
    handleAddTemporalMessage,
  };
};

export default ChatsSlice.reducer;
