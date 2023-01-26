import * as React from "react";
import { useState} from "react";
import classes from "./Window.module.scss";
import SideBar from "../SideBar/SideBar";
import Page from "../Page/Page"

const Window = () => {
  const [currPage, setCurrPage] = useState("Chat");
  const changePage = (x:string) => {
    setCurrPage(x);
  }
  return (
    <div className={classes.app}>
      <h1>Личный кабинет</h1>
      <div className={classes.window}>
        <SideBar currPage={currPage} changePage={changePage}/>
        <Page currPage={currPage}/>
      </div>
    </div>
  );
};

export default Window;
