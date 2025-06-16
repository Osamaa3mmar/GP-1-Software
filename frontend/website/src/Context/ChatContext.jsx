import { createContext, useState } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <ChatContext.Provider
      value={{ selectedConversation, setSelectedConversation }}
    >
      {children}
    </ChatContext.Provider>
  );
}
