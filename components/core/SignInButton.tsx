"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-orange-500 text-center text-xl font-semibold">
          {session.user.name}
        </p>
        <Button
          variant="outline"
          className="h-9 w-auto bg-blue-900 text-white"
          onClick={() => signOut()}
        >
          Log out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex gap-4 ml-auto">
      <Button
        variant="outline"
        className="h-9 w-auto m-auto bg-green-500 text-white justify-end"
        onClick={() => signIn()}
      >
        Login
      </Button>
    </div>
  );
};

export default SignInButton;
