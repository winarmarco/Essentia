import React from "react";

const Button: React.FC<{
  filled?: boolean | false;
  className: string;
  children: React.ReactNode;
}> = (props) => {
  const classes = props.className.split(" ");
  const mainColour = classes
    .find((str) => str.startsWith("main-"))
    ?.replace("main-", "");
  const secColour = classes
    .find((str) => str.startsWith("sec-"))
    ?.replace("sec-", "");

  const bgColour = `bg-${props.filled ? mainColour : "transparent"}`;
  const textColour = `text-${props.filled ? secColour : mainColour}`;
  const borderColour = `${!props.filled && 'transition-all border-[1px] border-' + mainColour}`;
  const hoverEffect = `${!props.filled && 'transition-all hover:bg-' + mainColour + ' hover:text-' + secColour}`;

  console.log(hoverEffect)

  return (
    <button
      className={`px-10 py-2 
      ${bgColour} ${textColour}
      ${borderColour} ${hoverEffect}
        ${props.className}
      `}
    >
      {props.children}
    </button>
  );
};

export default Button;
