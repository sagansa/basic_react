// resources/js/Pages/Roles/Index.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RoleTable from './RoleTable';
import CreateRole from '@/Components/CreateRole';

export default function Index({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles Management
                </h2>
            }
        >
            <Head title="Roles Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-medium">Create New Role</h3>
                            <CreateRole />
                        </div>
                        <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-medium">Existing Roles</h3>
                            <RoleTable roles={roles} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
