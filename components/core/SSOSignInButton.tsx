"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const SSOSignInButton = ({ value, text, img }: any) => {
  const loginWith = () =>
    signIn(value, { callbackUrl: process.env.NEXTAUTH_URL });

  return (
    <div
      className="group rounded-lg border px-5 py-4 transition-colors border-gray-300 bg-gray-100 hover:border-blue-300 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer"
      onClick={loginWith}
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {value?.toUpperCase()}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{text}</p>
    </div>
  );
};

export default SSOSignInButton;
