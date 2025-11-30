import React, { useState } from 'react';
import { useUpdateUser } from '@/lib/hooks';
import { Input } from './input';
import SubmitButton from './submitButton';

interface ProfileCardProps {
    user: {
        id: string;
        name: string;
        role: string;
    };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const { mutate: updateUser, isPending } = useUpdateUser();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ name }, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto mt-10 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div className='flex gap-3'>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-white hover:bg-gray-700 rounded bg-blue-700"
                        >
                            Cancel
                        </button>
                        <SubmitButton disabled={isPending}>
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </SubmitButton>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Name</label>
                        <p className="text-lg text-gray-900">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Role</label>
                        <p className="text-lg text-gray-900 capitalize">{user.role}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
