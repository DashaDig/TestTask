import * as React from "react";
import classes from "./SideBar.module.scss";
import PagesNames from "../constants/PagesNames";
import SideBarLi from "./SideBarLi/SideBarLi";

interface PagePrors {
  currPage: string;
  changePage: (x: string) => void;
}

const SideBar = (props: PagePrors) => {
  return (
    <ol className={classes.ol}>
      {Object.keys(PagesNames).map((x) => (
        <SideBarLi pageProps={props} key={x} page={x} />
      ))}
    </ol>
  );
};

export default SideBar;
