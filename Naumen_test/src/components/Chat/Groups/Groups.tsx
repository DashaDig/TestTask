import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./Groups.module.scss";
import Group from "./Group/Group";


const Groups = observer(() => {
  return (
    <ol className={classes.ol}>
      <>{messages.groupsInfo && messages.groupsInfo.chatGroupsInfo.map((x)=> <Group
          id={x.groupId}
          key ={x.groupId}
          name={x.groupTitle}
        />)}</>
      
    </ol>
  );
});



export default Groups;
