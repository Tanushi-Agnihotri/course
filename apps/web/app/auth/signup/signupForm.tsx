// apps/web/components/ui/SignUpForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/lib/hooks"; // your React Query hook

export default function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = useSignup();

  // React Query v5 uses isPending; v4 uses isLoading
  const isPending = (signup as any).isPending ?? (signup as any).isLoading ?? false;

  const serverMessage = signup.error ? (signup.error as any)?.message ?? String(signup.error) : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          // refresh server components (e.g. navbar) if you rely on server session checks
          router.refresh();
          router.push("/auth/signin");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Create an Account</h1>

        {serverMessage && <div className="text-sm text-red-500 mb-4">{serverMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <Label className="block text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

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

        <div className="flex items-center justify-center">
          <SubmitButton disabled={isPending}>
            {isPending ? "Signing up..." : "Sign Up"}
          </SubmitButton>    
        </div>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}















// import SubmitButton from '@/components/ui/submitButton';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import React, { useActionState } from 'react'
// import { signUp } from '@/lib/auth';

// const SignUpForm = () => {

//     const [state,action]= useActionState(signUp,undefined)
// return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        
//         <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
//           Create an Account
//         </h1>

//         {state?.message && (
//             <div className="text-sm text-red-500">{state.message}</div>
//         )}

//         <form action={action} className="space-y-5">

//           {/* Name */}
//           <div>
//             <Label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </Label>
//             <Input
//               name="name"
//               type="text"
//               placeholder="John Doe"
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 
//                          focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {state?.error?.name && (
//                 <div className="text-sm text-red-500">{state.error.name}</div>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <Label className="block text-sm font-medium text-gray-700">
//               Email Address
//             </Label>
//             <Input
//               name="email"
//               type="email"
//               placeholder="example@email.com"
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 
//                          focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {state?.error?.email && (
//                 <div className="text-sm text-red-500">{state.error.email}</div>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <Label className="block text-sm font-medium text-gray-700">
//               Password
//             </Label>
//             <Input
//               name="password"
//               type="password"
//               placeholder="••••••••"
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 
//                          focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {state?.error?.password && (
//                 <div className="text-sm text-red-500">
//                     <p>Password must:</p>
//                     <ul>
//                         {state.error.password.map((m,i)=>(
//                             <li key={i}>{m}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//           </div>

//             {/*SignUp Button */}
//           <SubmitButton>Sign Up</SubmitButton>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/auth/signin" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUpForm
