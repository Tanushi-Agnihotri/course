"use client";

import React from "react";
import { useCourses, useDeleteCourse, useSession } from "@/lib/hooks";
import CourseCard from "@/components/ui/CourseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course } from "@/lib/type";

export default function CoursesPage() {
    const { data: courses, isLoading, error } = useCourses();
    const { data: session } = useSession();
    const { mutate: deleteCourse } = useDeleteCourse();
    const router = useRouter();

    const isAdmin = session?.role === "admin";



    if (isLoading) return <div className="p-8 text-center">Loading courses...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading courses</div>;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Available Courses</h1>
                {isAdmin && (
                    <Link
                        href="/admin/courses/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Create New Course
                    </Link>
                )}
            </div>

            {courses?.length === 0 ? (
                <p className="text-center text-gray-500">No courses available yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses?.map((course: Course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isAdmin={isAdmin}
                            onDelete={(id) => {
                                if (confirm("Are you sure you want to delete this course?")) {
                                    deleteCourse(id);
                                }
                            }}
                            onEdit={(id) => {
                                router.push(`/admin/courses/${id}/edit`);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
