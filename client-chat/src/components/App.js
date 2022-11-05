import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { ConversationsProvider } from "../context/ConversationsContext";
import { SocketProvider } from "../context/SocketContext";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
