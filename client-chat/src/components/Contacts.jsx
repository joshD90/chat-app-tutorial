import React from "react";
import { useContacts } from "../context/ContactsContext";
import { ListGroup } from "react-bootstrap";

function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts &&
        contacts.map((contact) => (
          <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default Contacts;
