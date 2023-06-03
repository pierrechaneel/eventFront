// app language context definition

import axios from "axios";
import * as React from "react";
import configs from "../configs/generals.json";

const contactsCtx = React.createContext({
  chatSubject: null,
  setChatSubject: null,
  filterGuests: null,
  setFilteGuests: null,
  guests: null,
  setguests: null,
});

const ContactsContext = ({ children }) => {
  const [guests, setguests] = React.useState([]);

  const [chatSubject, setChatSubject] = React.useState({});
  const [filterGuests, setFilteGuests] = React.useState([]);
  const chats = React.useRef({});

  const [chatMsgs, setChatMsgs] = React.useState([]);

  const [guest, setGuest] = React.useState({});

  React.useEffect(() => {
    (async () => {
      console.log("chat thread base value", chatSubject);

      const guest = JSON.parse(window.sessionStorage.getItem("guest"));

      setGuest(guest);

      chats.current = {};

      await axios
        .get(
          `${configs.backendUrl}/api/messages?eventId=${guest?.event?.id}&from=${guest?.accessKey}&to=${chatSubject?.accessKey}`
        )
        .then((results) => {
          console.log("message data received", results?.data);

          results?.data?.messageData?.forEach((target) => {
            const groupKey = new Date(target?.createdAt).toLocaleDateString();

            if (Object.keys(chats?.current)?.includes(groupKey)) {
              chats.current[groupKey] = [target, ...chats?.current[groupKey]];
            } else {
              const newChats = { ...chats.current };

              newChats[groupKey] = [target];

              chats.current = newChats;
            }

            //   console.log("new chat messages", chats.current);
          });

          console.log("received stored chats", chats.current);

          setChatMsgs(chats.current);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get messages",
            error
          );

          if (Object.keys(chatSubject).length > 0) {
            setSnackMessage("Erreur de chargement du chat");
            setSeverity("error");
            setIsnackVisible(true);
          }
        });
    })();
  }, [chatSubject]);

  return (
    <contactsCtx.Provider
      value={{
        chatSubject,
        setChatSubject,
        filterGuests,
        setFilteGuests,
        guests,
        setguests,
        chatMsgs,
        setChatMsgs,
        chats,
      }}
    >
      {children}
    </contactsCtx.Provider>
  );
};

export { contactsCtx };
export default ContactsContext;
