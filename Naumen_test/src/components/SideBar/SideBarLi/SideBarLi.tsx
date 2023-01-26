import * as React from "react";
import { observer } from "mobx-react-lite";
import classes from "./SideBarLi.module.scss";
import PagesNames from "../../constants/PagesNames";
import clsx from "clsx";
import messages from "../../../store/messages";

import IconTimetable from "../../../images/iconTimetable.svg";
import IconChat from "../../../images/iconChat.svg";
import IconeElectronicJournal from "../../../images/iconElectronicJournal.svg";
import IconSettings from "../../../images/iconSettings.svg";

interface LiProps {
  pageProps: { currPage: string; changePage: (x: string) => void };
  page: string;
}

const SideBarLi = observer((props: LiProps) => {
  let visible = messages.unreadMessagesChats;
  return (
    <li
      className={clsx(
        classes.li,
        props.pageProps.currPage === props.page && classes.activePage
      )}
      onClick={() => props.pageProps.changePage(props.page)}
    >
      {props.page === "Timetable" && (
        <IconTimetable
          fill={props.pageProps.currPage === props.page ? "#1F70F6" : "#A4B4C9"}
        />
      )}
      {props.page === "Journal" && (
        <IconeElectronicJournal
          fill={props.pageProps.currPage === props.page ? "#1F70F6" : "#A4B4C9"}
        />
      )}
      {props.page === "Chat" && (
        <IconChat
          fill={props.pageProps.currPage === props.page ? "#1F70F6" : "#A4B4C9"}
        />
      )}
      {props.page === "Settings" && (
        <IconSettings
          fill={props.pageProps.currPage === props.page ? "#1F70F6" : "#A4B4C9"}
        />
      )}
      <span className={classes.span}>{PagesNames[props.page]}</span>
      <div className={props.page === "Chat" && visible && classes.circle || ''} />
    </li>
  );
});

export default SideBarLi;
