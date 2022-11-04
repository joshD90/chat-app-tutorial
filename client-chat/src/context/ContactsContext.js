import React, { useContext } from "react";

const ContactContext = React.createContext();

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => [...prevContacts, { id, name }]);
  }
  function deleteContact(id) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  }

  return (
    <ContactContext.Provider value={(contacts, createContact, deleteContact)}>
      {children}
    </ContactContext.Provider>
  );
}
