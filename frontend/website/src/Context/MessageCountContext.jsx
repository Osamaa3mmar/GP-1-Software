import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const MessageCountContext = createContext();

export const MessageCountProvider = ({ children , type}) => {
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);
  const getCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:4545/conversitions/getconversitions/${type}`,
        {
          headers: {
            token,
          },
        }
      );
      console.log("data", data);
      const temp = data.convs.filter((item) => {
        if (
          item.messages &&
          item.messages.length > 0 &&
          !item.messages[0].isRead &&
          item.messages[0].senderId != user.id
        ) {
          return item;
        }
      });
      setCount(temp.length);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(count, "count");
  useEffect(() => {
    if (user) getCount();
  }, [user]);
  return (
    <MessageCountContext.Provider value={{ messageCount: count, setCount }}>
      {children}
    </MessageCountContext.Provider>
  );
};
