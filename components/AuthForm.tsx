"use client";

import { useState } from "react";
import type {SubmitEvent} from "react"
import T from "./typography";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

type AuthFromProps = { // from takes one of two modes, login or register
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFromProps) {
    const auth = useAuth()
    const router = useRouter()
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    setError(undefined);
    setPending(true);
    const response = mode === "login" 
      ? await auth.login(email, password)
      : await auth.register(email, password);
    setPending(false)
    if(typeof response === "string") {
        setError(response)
        return;
    }
    router.push("/")
  }

  return (
    <form onSubmit={submit}>
      <T.Header>{mode === "login" ? "Log in" : "Register"}</T.Header>
      <input name="email" type="email" placeholder="Enter email" required />
      <input name="password" type="password" placeholder="Enter Password" required />
      <button type="submit" disabled={pending}>
        {mode === "login" ? "Log in" : "Register"}
      </button>
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </form>
  );
}
