"use client";

import React from "react";
import { useCourse, useUpdateCourse } from "@/lib/hooks";
import { useRouter, useParams } from "next/navigation";
import CourseForm from "@/components/ui/CourseForm";

export default function EditCoursePage() {
    const params = useParams();
    const id = params.id as string;
    const { data: course, isLoading, error } = useCourse(id);
    const { mutate: updateCourse, isPending } = useUpdateCourse();
    const router = useRouter();

    const handleSubmit = (data: { title: string; description: string; price: number }) => {
        updateCourse(
            { id, data },
            {
                onSuccess: () => {
                    router.push("/courses");
                },
            }
        );
    };

    if (isLoading) return <div className="p-8 text-center">Loading course...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading course</div>;

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Course</h1>
            <CourseForm
                initialData={course}
                onSubmit={handleSubmit}
                isSubmitting={isPending}
                submitLabel="Update Course"
                onCancel={() => router.back()}
            />
        </div>
    );
}
