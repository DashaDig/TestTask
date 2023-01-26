import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./Input.module.scss";
import clsx from "clsx";

const Input = observer(() => {
  const Send = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      messages.sendMessage();
    }
  };

  return (
    <label className={classes.labelText}>
      <input
        className={clsx(
          classes.text,
          messages.inputFile && messages.checkSizeOfFile && classes.textWhenFile
        )}
        type="text"
        placeholder={"Написать сообщение..."}
        value={messages.inputMessage}
        onChange={(e) => messages.setInputMessage(e.target.value)}
        onKeyDown={(e) => Send(e)}
        disabled={messages.inputFile && messages.checkSizeOfFile}
      ></input>
    </label>
  );
});

export default Input;
