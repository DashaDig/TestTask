import * as React from "react";
import classes from "./Page.module.scss";
import Chat from "../Chat/Chat";
import PagesNames from "../constants/PagesNames";

interface PagePrors {
  currPage: string;
}

const Page = (props: PagePrors) => {
  return (
    <div className={classes.page}>
      <h2>{props.currPage === "Chat"?"Чат с группой":PagesNames[props.currPage]}</h2>
      {props.currPage === "Chat"&&<Chat/>}
    </div>
  );
};

export default Page;
