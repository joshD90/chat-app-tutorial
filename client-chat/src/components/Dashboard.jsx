import React from "react";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../context/ConversationsContext";
import Sidebar from "./Sidebar";

function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div>
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar id={id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  );
}

export default Dashboard;
