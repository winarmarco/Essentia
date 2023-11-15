"use client";

import Link from "next/link";
import React from "react";
import Container from "../Container";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SIGNIN_PAGE_URL } from "@/utils/constants";

const Logo = () => {
  return (
    <div>
      <h1>ESSENTIA</h1>
    </div>
  );
};

const NavLink: React.FC<{href: string; children: React.ReactNode}> = (
  props
) => {
  return (
    <li>
      <Link replace={true} href={props.href}>{props.children}</Link>
    </li>
  );
};

const LogoutButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      filled
      onClick={() => {
        signOut();
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
};

const LoginButton: React.FC = () => {
  return (
    <NavLink href={SIGNIN_PAGE_URL}>
      <Button filled>Login</Button>
    </NavLink>
  );
};

const NavLinks: React.FC<{isAuth: boolean}> = ({isAuth}) => {
  
  return (
    <ul className="flex gap-x-10 items-center">
      <NavLink href="/">About</NavLink>
      <NavLink href="/">Contact</NavLink>
      <NavLink href="/products">Products</NavLink>
      {isAuth && <NavLink href="/cart">My Cart</NavLink>}
      {isAuth ? <LogoutButton /> : <LoginButton />}
    </ul>
  );
};

const Navbar = () => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const {data: session} = useSession();
  const isAuth = (session && session.user);

  return (
    <Container className="py-8 w-100 flex justify-between">
      <Link href="/">
        <Logo />
      </Link>
      <NavLinks isAuth={isAuth} />
    </Container>
  );
};

export default Navbar;
