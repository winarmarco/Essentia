import {LiaTimesSolid} from "react-icons/lia";
import Container from "../Container";
import React from "react";

type Modal = {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  closeModal: () => void;
};

const Modal: React.FC<Modal> = ({children, visible = false, closeModal}) => {
  return (
    <Container
      className={`fixed inset-0 items-center justify-center z-50 h-screen transition-all duration-500 flex ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="absolute inset-0 bg-white opacity-90 bg-gray flex items-center justify-center transition-opacity"></div>
      <div
        className="absolute top-20 z-30 right-10 cursor-pointer"
        onClick={() => {
          closeModal()
        }}
      >
        <LiaTimesSolid className="text-3xl" />
      </div>

      <div
        className={`relative z-20 h-full pb-10 w-full md:w-[70%] transition-all duration-500 ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </Container>
  );
};

export default Modal;
