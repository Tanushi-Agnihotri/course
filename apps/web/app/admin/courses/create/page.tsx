"use client";

import React from "react";
import { useCreateCourse } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import CourseForm from "@/components/ui/CourseForm";

export default function CreateCoursePage() {
    const { mutate: createCourse, isPending } = useCreateCourse();
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = (data: { title: string; description: string; price: number }) => {
        setError(null);
        createCourse(data, {
            onSuccess: () => {
                router.push("/courses");
            },
            onError: (err: any) => {
                console.error("Failed to create course:", err);
                setError(err.response?.data?.message || "Failed to create course. Please try again.");
            },
        });
    };

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Course</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <CourseForm
                onSubmit={handleSubmit}
                isSubmitting={isPending}
                submitLabel="Create Course"
                onCancel={() => router.back()}
            />
        </div>
    );
}
