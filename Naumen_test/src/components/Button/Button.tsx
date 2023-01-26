import * as React from "react";
import { observer } from "mobx-react-lite";
import classes from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  style: string,
  do: () => void,
  svg:React.FunctionComponent<React.SVGAttributes<SVGElement>>,
}

const Button = observer((props: ButtonProps) => {
  return (
    <button onClick={props.do} className={clsx(classes.button, props.style)}>
      <props.svg/>
    </button>
  );
});

export default Button;
