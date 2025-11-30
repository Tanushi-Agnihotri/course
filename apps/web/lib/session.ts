// lib/session.ts
"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  id: string;
  name: string;
  role: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7D")
    .sign(encodedKey);

  // set cookie (server context)
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session:", err);
    // DON'T modify cookies here — just return null
    return null;
  }
}







// lib/session.ts (server)
// "use server";

// import { jwtVerify, SignJWT } from "jose";
// import { cookies } from "next/headers";

// export type Session = {
//   user: {
//     id: string;
//     name: string;
//   };
//   accessToken: string;
// };

// const secretKey = process.env.SESSION_SECRET_KEY;
// if (!secretKey) {
//   // If secret missing, fail fast (so you notice)
//   console.error("SESSION_SECRET_KEY is not defined in environment!");
// }
// const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : undefined;

// export async function createSession(payload: Session) {
//   if (!encodedKey) throw new Error("Missing SESSION_SECRET_KEY");

//   const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   const sessionToken = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);

//   // set cookie — secure only in production
//   (await cookies()).set("session", sessionToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     expires: expiredAt,
//     sameSite: "lax",
//     path: "/",
//   });

//   return sessionToken;
// }

// export async function getSession(): Promise<Session | null> {
//   if (!encodedKey) return null;

//   const cookie = (await cookies()).get("session")?.value;
//   if (!cookie) return null;

//   try {
//     const { payload } = await jwtVerify(cookie, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload as Session;
//   } catch (err) {
//     console.error("Failed to verify the session:", err);
//     // cookie invalid -> remove it and return null
//     (await cookies()).delete("session");
//     return null;
//   }
// }

// export async function deleteSession() {
//   (await cookies()).delete("session");
// }





// "use server"

// import {jwtVerify, SignJWT} from 'jose'
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';


// export type Session = {
//     user:{
//         id: string,
//         name: string
//     };
//     accessToken: string;
//     // refreshToken: string;
// };

// const secretKey = process.env.SESSION_SECRET_KEY!;
// const encodedKey = new TextEncoder().encode(secretKey);

// export async function createSession(payload: Session){
//     const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);


//     //Encrypted payload

//     const session = await new SignJWT(payload)
//     .setProtectedHeader({alg:"HS256"})
//     .setIssuedAt()
//     .setExpirationTime("7D").sign(encodedKey);

//     //Storing session in cookies

//         //Storing session in cookies
//        (await cookies()).set("session",session,{
//         httpOnly: true,
//         secure: true,
//         expires: expiredAt,
//         sameSite: "lax",
//         path: "/",
//     });             
// }


// export async function getSession(){
//     const cookie = (await cookies()).get("session")?.value;

//     if(!cookie) return null;

//     try{
//         const {payload} = await jwtVerify(cookie,encodedKey,{
//             algorithms: ["HS256"],
//         });

//         return payload as Session;
//     }

//     catch(err){
//         console.error("Failed to verify the session: ",err)
//         redirect('/auth/signin');
//     }
// }
