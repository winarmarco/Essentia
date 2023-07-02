"use client";
import React, { DOMAttributes } from "react";

const Button: React.FC<{
  filled?: boolean | false;
  className?: string | "";
  children?: React.ReactNode;
  onClick?: () => void,
}> = ({ filled = false, className = "", children, onClick = () => {} }) => {
  
  
  return (
    <button onClick={onClick}
      className={`px-10 py-2 
        ${
          filled
            ? `bg-black text-white`
            : `bg-transparent text-black hover:bg-black hover:text-white border-[1px] border-black transition-colors`
        }

         ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
