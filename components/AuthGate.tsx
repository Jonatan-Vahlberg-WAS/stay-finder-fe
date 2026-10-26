import { useAuth } from "@/contexts/auth";
import Link from "next/link";
import { PropsWithChildren } from "react";


export default function AuthGate({ children }: PropsWithChildren) {
    const auth = useAuth()
    if(auth.isPending) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if(!auth.user) {
        return (
            <div className="p-4 rounded-md bg-slate-200">
                You have to be logged in to do this
                <Link href={"/auth/login"}>
                    Go to Login
                </Link>
            </div>
        )
    }
    return children
}