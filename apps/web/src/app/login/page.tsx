"use client"
import { useState } from "react";

import Link from "next/link"
import { setSessionStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY } from "@/constants";
import { signinApi } from "@/services/auth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      usernameOrEmail: e.currentTarget.usernameOrEmail.value,
      password: e.currentTarget.password.value,
    }
    setIsLoading(true);
    signinApi(params).then((response) => {
      if (response?.token) {
        setSessionStorage(AUTH_TOKEN_KEY, response?.token);
        toast.success("Login successful");
        router.push("/");
        setError("");
      } else {
        setError(response?.message);
      }
    }).catch((error) => {
      setError(error?.response?.data?.message);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row justify-around w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login to the metaverse to meet your friends.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username or Email<span className="text-red-500">*</span></span>
              </label>
              <input type="text" placeholder="username or email" className="input input-bordered" required name="usernameOrEmail" autoComplete={"username" || "email"} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password<span className="text-red-500">*</span></span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required name="password" autoComplete="current-password" />
            </div>
            {error && (
              <label className="label">
                <span className="label-text text-red-500">{error}</span>
              </label>
            )}
            <label className="label">
              <span className="label-text">Don't have an account?<Link href="/signup" className="link link-hover">Signup</Link></span>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage