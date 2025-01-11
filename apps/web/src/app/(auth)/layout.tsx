'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyTokenApi } from "@/services/auth";
import { toast } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    useEffect(() => {
        verifyTokenApi().then(() => {
            console.log("token verified");
        }).catch(() => {
            toast.error("Invalid token, please login again");
            router.push("/login");
        });
    }, []);
    return <>{children}</>
}

export default Layout
