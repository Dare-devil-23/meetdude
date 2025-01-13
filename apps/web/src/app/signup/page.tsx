"use client"

import Link from "next/link"
import { useState } from "react";
import { signupApi } from "@/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      email: e.currentTarget.email.value,
    }
    signupApi(params).then((response) => {
      if (response?.userId) {
        toast.success("Signup successful, please login");
        router.push("/login");
        setError("");
      } else {
        setError(response?.message);
      }
    }).catch((error) => {
      setError(error?.response?.data?.message);
    });
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row justify-around w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Signup to the metaverse to meet your friends.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username <span className="text-red-500">*</span></span>
              </label>
              <input type="text" placeholder="username" className="input input-bordered" required name="username" autoComplete="username" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email <span className="text-red-500">*</span></span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required name="email" autoComplete="email" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password <span className="text-red-500">*</span></span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required name="password" autoComplete="new-password" />
            </div>
            {error && (
              <label className="label">
                <span className="label-text text-red-500">{error}</span>
              </label>
            )}
            <label className="label">
              <span className="label-text">Already have an account? <Link href="/login" className="link link-hover">Login</Link></span>
            </label>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage