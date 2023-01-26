import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./Input.module.scss";
import clsx from "clsx";
import { useEffect } from "react";

const Input = observer(() => {
  const keydownHandler = (e:KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      messages.sendMessage();
    }
  };
  useEffect(()=>{
    document.addEventListener('keydown', keydownHandler);
    return ()=>{
      document.removeEventListener('keydown', keydownHandler);
    }
  },[])

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
        disabled={messages.inputFile && messages.checkSizeOfFile}
      ></input>
    </label>
  );
});

export default Input;
