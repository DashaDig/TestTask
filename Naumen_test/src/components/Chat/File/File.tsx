import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./File.module.scss";
import Button from "../../Button/Button";
import CloseIcon from "../../../images/close.svg";

const File = observer(() => {
  return (
    <div className={classes.container}>
      {messages.checkSizeOfFile ? (
        <>
          <a className={classes.fileName} href="">
            {messages.inputFile.name +
              " " +
              Math.round(messages.inputFile.size / 1024 *100)/100 +
              "КБ"}
          </a>
          <Button
            style={classes.buttonDelete}
            do={messages.deleteFile}
            svg={CloseIcon}
          />
        </>
      ) : (
        <p className={classes.error}>Допустимый размер файла: не больше 1 МБ</p>
      )}
    </div>
  );
});

export default File;
