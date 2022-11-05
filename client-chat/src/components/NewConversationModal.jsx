import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsContext";
import { useConversations } from "../context/ConversationsContext";

function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(contactId))
        return prev.filter((id) => contactId !== id);
      return [...prev, contactId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Start a New Chat</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="mt-4">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
