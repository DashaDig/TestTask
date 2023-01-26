import * as React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import classes from "./DownloadButton.module.scss";
import File from "../../../images/file.svg";

const DownloadButton = observer(() => {
  return (
    <label className={classes.labelFile}>
      <input
        className={classes.file}
        type='file'
        accept='image/*, .pdf, .doc, .docx'
        onChange={messages.setFile}
        value={''}
      ></input>
      <File fill='#59677D' width="18"/>
    </label>
  );
});

export default DownloadButton;
