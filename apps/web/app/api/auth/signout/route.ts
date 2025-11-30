// app/api/auth/signout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
  // delete the cookie
  (await cookies()).delete("session");
  return NextResponse.json({ ok: true });
}