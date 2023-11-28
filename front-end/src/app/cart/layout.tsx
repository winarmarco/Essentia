import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import Loading from "@/components/shared/loading/Loading";
import Main from "@/components/shared/main/Main";
import Navbar from "@/components/shared/navbar/Navbar";
import {AuthProvider} from "@/utils/providers/AuthProvider";
import {Providers} from "@/utils/redux/Provider";
import {getServerSession} from "next-auth";
import Link from "next/link";
import {Suspense} from "react";
import {Toaster} from "react-hot-toast";

export const metadata = {
  title: "Create Next App",
  description: "My Cart",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>

      <Main className="flex-grow">
        <Container className="w-full flex flex-col pt-10">{children}</Container>
      </Main>
      <Footer />
    </div>
  );
}