import React from "react";

type MainType = {
  children: React.ReactNode;
  className?: string;
};

const Main: React.FC<MainType> = ({children, className = ""}) => {
  return <main className={className}>{children}</main>;
};

export default Main;
