"use client";
import Navbar from "@/components/common/navbar/Navbar";
import "../../globals.css";
import React, {useState} from "react";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import SignUpForm from "@/components/page-components/auth/SignUpForm";

const SignUp: React.FC = () => {

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow relative">
        <Container className="w-full h-full flex justify-center items-center absolute inset-0">
          <div className="flex w-1/2 px-10">
            <SignUpForm />
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default SignUp;
