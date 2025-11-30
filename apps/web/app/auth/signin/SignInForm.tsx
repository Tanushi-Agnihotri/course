

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import SubmitButton from "@/components/ui/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signinClient } from "@/lib/api";

/**
 * Signin payload shape — change if your backend expects different fields
 */
type SigninPayload = {
  email: string;
  password: string;
};



export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = useMutation({
    mutationFn: (body: SigninPayload) => signinClient(body),
    onSuccess: () => {
      // refresh server components (if you rely on server session) and redirect
      router.refresh();
      router.push("/");
    },
  });

  // React Query v5 uses isPending; v4 uses isLoading
  const isPending = (signin as any).isPending ?? (signin as any)  .isLoading ?? false;

  const serverMessage = signin.error ? (signin.error as any)?.message ?? String(signin.error) : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signin.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign in to your account</h1>

        {serverMessage && <div className="text-sm text-red-500 mb-4">{serverMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <Label className="block text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <SubmitButton disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
