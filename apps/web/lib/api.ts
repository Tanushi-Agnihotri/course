import { AxiosInstance } from "@/app/services/auth/AxiosInstance";
import axios from "axios";

export type SignUpPayload = { name: string; email: string; password: string };
export type SignInPayload = { email: string; password: string };

export async function signupClient(payload: SignUpPayload) {
  const res = await AxiosInstance.post("/auth/signup", payload);
  return res.data;
}

export async function signinClient(payload: SignInPayload) {
  const res = await AxiosInstance.post("/auth/signin", payload, {
    withCredentials: true   // <- optional if AxiosInstance already has it
  });
  return res.data;
}

export async function getSession() {
  const res = await AxiosInstance.get("/auth/me");
  return res.data;
}

