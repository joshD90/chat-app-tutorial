import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

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
    <ContactsContext.Provider
      value={{ contacts, createContact, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
