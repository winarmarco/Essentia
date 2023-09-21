"use client";
import Navbar from "@/components/shared/navbar/Navbar";
import "../../globals.css";
import React, {useState} from "react";
import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import SignInForm from "@/components/page-components/auth/SignInForm";


const Login: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow relative">
        <Container className="w-full h-full flex justify-center items-center relative">
          <div className="flex w-1/2 px-10">
            <SignInForm />
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Login;
