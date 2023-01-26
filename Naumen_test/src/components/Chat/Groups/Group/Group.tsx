import * as React from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import classes from "./Group.module.scss";
import messages from "../../../../store/messages";

interface GroupContent {
  id: number;
  name: string;
}

const Group = observer((props: GroupContent) => {
  let thisUnread =
    messages.unreadMessages &&
    messages.unreadMessages.find((x) => x.groupId === props.id).unreadMessages;
  return (
    <li
      className={classes.li}
      onClick={() => {
        messages.setCurrGroup(props.id);
        messages.readMessages(props.id);
        messages.getGroupMessages(props.id)
      }}
    >
      <span
        className={clsx(
          classes.span,
          messages.currGroup === props.id && classes.activeGroup
        )}
      >
        {props.name}
      </span>
      <div className={(thisUnread > 0 && classes.circle) || ""} />
    </li>
  );
});

export default Group;
