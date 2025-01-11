"use client"

import { AUTH_TOKEN_KEY } from "@/constants";
import { setSessionStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const handleLogout = () => {
    setSessionStorage(AUTH_TOKEN_KEY, "");
    router.push("/login");
  }

  return (
    <>
      <h1 className="text-3xl">Home</h1>
      <button className="btn btn-primary rounded-full w-32" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default HomePage;