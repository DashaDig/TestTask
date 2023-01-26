import * as React from "react";

import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import Message from "../Message/Message";
import classes from "./Messages.module.scss";
import { useState, useEffect } from "react";

const Messages = observer(() => {
  const [needUpdate, setNeedUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (needUpdate) {
      messages.uploadMesseges(currentPage + 1);
      setCurrentPage(currentPage + 1);
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  useEffect(() => {
    messages.getNewMessage();
  }, []);

  useEffect(() => {
    setNeedUpdate(false);
    setCurrentPage(1);
    let scrollingDiv = document.getElementById('scroll')
    scrollingDiv.scrollTo({top:scrollingDiv.scrollHeight});
  }, [messages.currGroup]);

  function onScrollList(event: React.UIEvent<HTMLDivElement>) {
    const scrollTop =
      event.currentTarget.offsetHeight - event.currentTarget.scrollTop ===
      event.currentTarget.scrollHeight;
    if (scrollTop) {
      setNeedUpdate(true);
    }
  }

  return (
    <div
      id="scroll"
      className={classes.messages}
      onScroll={(event) =>
        currentPage !== messages.countOfPageGroupChat && onScrollList(event)
      }
    >
      <>
        {messages.visibleMeessages &&
          messages.visibleMeessages.map((x, id) => (
            <Message info={x} key={id} />
          ))}
      </>
    </div>
  );
});

export default Messages;
