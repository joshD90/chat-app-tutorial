import React, { useContext, useEffect, useState, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "../context/ContactsContext";
import { useSocket } from "../context/SocketContext";

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export function ConversationsProvider({ children, id }) {
  const { contacts } = useContacts();
  const socket = useSocket();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const createConversation = (recipients) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversation) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversation.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversation, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("recieve-message", addMessageToConversation);
    return () => socket.off("recieve-message");
  }, [socket, addMessageToConversation]);

  const value = {
    formattedConversations,
    createConversation,
    sendMessage,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
};
