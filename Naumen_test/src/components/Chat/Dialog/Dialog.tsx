import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import Messages from "../Messages/Messages";
import classes from "./Dialog.module.scss";
import ChatInput from "../ChatInput/ChatInput";


const Dialog = observer(() => {
  if(messages.currGroup === 0){
    return(<div className={classes.emptyDialog}></div>)
  }
  let currMessagesCountPeople = messages.groupMessages && messages.groupMessages.numberOfParticipants;
  return (
    <div className={classes.dialog}>
      <p className={classes.countPeople}>
        {currMessagesCountPeople}{" "}
        {CountWord(currMessagesCountPeople)}
      </p>
      <Messages />
      <ChatInput/>
    </div>
  );
});

const CountWord = (count: number) => {
  count = count % 100;
  if (count >= 11 && count <= 19) {
    return "участников";
  }
  count = count % 10;
  if (count === 1) {
    return "участник";
  } else if (count >= 2 && count <= 4) {
    return "участника";
  }
  return "участников";
};

export default Dialog;
