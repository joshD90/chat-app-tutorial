import React, { useState, useEffect } from "react";
//we use this to differentiate between all items in local storage
const PREFIX = "chat-app-";

function useLocalStorage(key, initialValue) {
  //create unique identifier for value based on prefix and key
  const prefixedKey = PREFIX + key;
  //use the functional part of use state to avoid having to parse every time
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    console.log(jsonValue);
    //we parse if there is something already there
    if (jsonValue != "null" && jsonValue != "undefined" && jsonValue) {
      console.log("jsonvalue is not equal to null");
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      //if not return the initial value unchanged
      return initialValue();
    } else {
      return initialValue;
    }
  });
  //any time the identifier or the value changes we send to local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
