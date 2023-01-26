import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./Message.module.scss";
import clsx from "clsx";
import File from "../../../images/file.svg";

interface MessageProps {
  info: {
    file?: { fileName: string; apiUrl: string };
    text?: string;
    userInfo: {
      firstName: string;
      lastName: string;
      userId: number;
    };
  };
}

const Message = observer((props: MessageProps) => {
  let NotMainUser = props.info.userInfo.userId !== messages.groupsInfo.userId;
  return (
    <div
      className={clsx(classes.message, !NotMainUser && classes.UserPosition)}
    >
      {NotMainUser && (
        <div className={classes.circle}>
          {props.info.userInfo.lastName[0] + props.info.userInfo.firstName[0]}
        </div>
      )}
      <div>
        {NotMainUser && (
          <span className={classes.Name}>
            {props.info.userInfo.lastName + " " + props.info.userInfo.firstName}
          </span>
        )}
        <div className={NotMainUser ? classes.Content : classes.User}>
          {props.info.text && <p className={classes.text}>{props.info.text}</p>}
          {props.info.file && (
            <a
              className={classes.file}
              href={props.info.file.apiUrl}
              download={props.info.file.fileName}
              target="_blank"
            >
              <File fill="#0054DE" width="11" className={classes.svg} />
              {props.info.file.fileName}
            </a>
          )}
          <p className={classes.time}>21.01.2021 11:11</p>
        </div>
      </div>
    </div>
  );
});

export default Message;
