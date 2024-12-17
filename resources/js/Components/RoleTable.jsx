import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';

export default function RoleTable({ roles }) {
    const { delete: destroy } = useForm();

    const handleDelete = (roleId) => {
        if (confirm('Are you sure you want to delete this role?')) {
            destroy(route('roles.destroy', roleId));
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full mt-4 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Role Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{role.name}</div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                <Link
                                    href={route('roles.edit', role.id)}
                                    className="inline-flex items-center px-3 py-1 mr-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                                >
                                    Edit
                                </Link>
                                <DangerButton
                                    onClick={() => handleDelete(role.id)}
                                >
                                    Delete
                                </DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
