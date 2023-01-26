import * as React from "react";
import { observer } from "mobx-react-lite";
import classes from "./ChatInput.module.scss";
import messages from "../../../store/messages";
import Button from "../../Button/Button";
import Input from "../Input/Input";
import DownloadButton from "../DownloadButton/DownloadButton";
import File from "../File/File";
import ButtonSend from "../../../images/buttonSend.svg";

const ChatInput = observer(() => {
  return (
    <div className={classes.container}>
      <div className={classes.chatInput}>
        <DownloadButton />
        <Input />
        <Button
          style={classes.sendButton}
          do={messages.sendMessage}
          svg={ButtonSend}
        />
      </div>
      {messages.inputFile && <File />}
    </div>
  );
});

export default ChatInput;
