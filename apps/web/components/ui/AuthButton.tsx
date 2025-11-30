"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AuthButton() {
    const { data: session, isLoading } = useSession();
    const qc = useQueryClient();
    const router = useRouter();

    const handleSignOut = async () => {
        // Clear React Query cache
        qc.setQueryData(["user"], null);
        qc.setQueryData(["session"], null);

        // Call backend signout (optional if you want to clear cookie server-side too)
        // For now, we'll just clear client state and redirect, assuming cookie is session-based or we add an endpoint
        // Ideally, we should call an API endpoint to clear the cookie.
        try {
            await fetch('/api/auth/signout', { method: 'POST' }); // We might need to implement this or use a simple link
        } catch (e) {
            console.error(e);
        }

        router.push("/auth/signin");
        router.refresh();
    };

    if (isLoading) {
        return <div className="text-sm">Loading...</div>;
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/profile" className="text-sm font-medium hover:underline">
                    Profile
                </Link>
                <span className="text-sm font-medium">{session.user.name}</span>
                <button
                    onClick={handleSignOut}
                    className="text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link href="/auth/signin" className="text-sm hover:underline">
                Sign In
            </Link>
            <Link
                href="/auth/signup"
                className="text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            >
                Sign Up
            </Link>
        </div>
    );
}
