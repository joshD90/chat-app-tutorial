import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsContext";
function Conversations() {
  const { formattedConversations, selectedConversationIndex } =
    useConversations();
  return (
    <ListGroup variant="flush">
      {formattedConversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectedConversationIndex(index)}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;
