"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import T from "./typography";

export default function AuthHeader(){
    const auth = useAuth()

    console.log("auth", auth)

    return (
        <div>
            {!auth.user && (
                <div className="flex items-center gap-3">
                    <T.Header>Not logged in</T.Header>
                    <Link href="/auth/login">Log in</Link>
                    <Link href="/auth/register">Register</Link>
                </div>
            )}
            {auth.user && (
                <div className="flex items-center gap-3">
                    <T.Header>Logged in {auth.user.email}</T.Header>
                    <button type="button" onClick={() => auth.logout()}>Log out</button>
                </div>
            )}
        </div>
    )
}
