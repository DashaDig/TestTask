import * as React from "react";
import classes from "./Chat.module.scss";
import Groups from "./Groups/Groups";
import Dialog from "./Dialog/Dialog";

const Chat = () => {
    return(
        <div className={classes.chatWindow}>
            <Groups/>
            <Dialog/>
        </div>
    )
}

export default Chat