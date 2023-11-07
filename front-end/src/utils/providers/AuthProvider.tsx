'use client';

import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react";

export const AuthProvider: React.FC<{children: React.ReactNode, session?: Session}> = ({children, session}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}