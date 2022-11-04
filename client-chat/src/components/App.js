import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const value1 = "String";
  const value2 = "Value";
  console.log({ value1, value2 });
  const [id, setId] = useLocalStorage("id");
  return <>{id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}</>;
}

export default App;
