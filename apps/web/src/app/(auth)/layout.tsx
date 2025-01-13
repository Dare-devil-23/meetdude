'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserApi } from "@/services/auth";
import { toast } from "react-toastify";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import AvatarUpdate from "@/components/AvatarUpdate";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const loggedinUser = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        setIsLoading(true);
        getUserApi().then((response) => {
            if (response?.user) {
                dispatch(setUser(response.user));
            }
        }).catch(() => {
            dispatch(clearUser());
            toast.error("Invalid token, please login again");
            router.push("/login");
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                {loggedinUser?.avatarId ? children : <AvatarUpdate />}
            </main>
            <Footer />
        </section>
    )
}

export default Layout
