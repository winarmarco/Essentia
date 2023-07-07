import React, {Fragment} from "react";

const Container: React.FC<{
  children: React.ReactNode;
  className?: string,
}> = (props) => {
  return <div className={"px-10 " + props.className}>{props.children}</div>;
};

export default Container;
