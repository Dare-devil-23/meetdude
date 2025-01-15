'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserApi } from "@/services/auth";
import { toast } from "react-toastify";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser } from "@/store/slices/userSlice";
import SpacesLoading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserApi().then((response) => {
            if (response?.user) {
                dispatch(setUser(response.user));
            }
            if (!response?.user?.avatarId) {
                router.push("/profile/update-avatar");
            }
        }).catch(() => {
            dispatch(clearUser());
            toast.error("Invalid token, please login again");
            router.push("/login");
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <section className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                {
                    isLoading ? (
                        <SpacesLoading />
                    ) : (
                        children
                    )
                }
            </main>
            <Footer />
        </section>
    )
}

export default Layout
