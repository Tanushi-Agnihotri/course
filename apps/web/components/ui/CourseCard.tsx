import React from 'react';
import { Course } from '../../lib/type';

interface CourseCardProps {
    course: Course;
    isAdmin?: boolean;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isAdmin, onDelete, onEdit }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
            <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-semibold text-blue-600">
                    {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
                </span>
                {isAdmin && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit && onEdit(course.id)}
                            className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(course.id)}
                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
