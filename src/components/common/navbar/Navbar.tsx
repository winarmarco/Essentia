"use client";

import Link from "next/link";
import React from "react";
import Container from "../Container";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/utils/redux/store";
import {signOut} from "@/utils/redux/Auth/AuthActions";
import {authActions} from "@/utils/redux/Auth/AuthSlice";
import { useRouter } from "next/navigation";

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
      <Link href={props.href}>{props.children}</Link>
    </li>
  );
};

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <Button
      filled
      onClick={() => {
        dispatch(authActions.signOut());
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
};

const LoginButton: React.FC = () => {
  return (
    <NavLink href="/auth/login">
      <Button filled>Login</Button>
    </NavLink>
  );
};

const NavLinks: React.FC<{isAuth: boolean}> = ({isAuth}) => {

  return (
    <ul className="flex gap-x-10 items-center">
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <NavLink href="/products">Products</NavLink>
      {isAuth && <NavLink href="/cart">My Cart</NavLink>}
      {isAuth ? <LogoutButton /> : <LoginButton />}
    </ul>
  );
};

const Navbar = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Container className="py-8 w-100 flex justify-between">
      <Link href="/">
        <Logo />
      </Link>
      <NavLinks isAuth={token !== undefined} />
    </Container>
  );
};

export default Navbar;
