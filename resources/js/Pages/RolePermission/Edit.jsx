import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Edit() {
    const { role } = usePage().props;
    const [roleName, setRoleName] = useState(role.name);

    const handleRoleUpdate = (e) => {
        e.preventDefault();
        axios.put(route('roles.update', role.id), { name: roleName })
            .then(() => window.location.href = route('roles.index'));
    };

    return (
        <>
            <Head title="Edit Role" />
            <div className="container p-4 mx-auto">
                <h1 className="text-2xl font-bold">Edit Role</h1>
                <form onSubmit={handleRoleUpdate} className="mt-4">
                    <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        className="p-2 w-full rounded border"
                    />
                    <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
                        Update Role
                    </button>
                </form>
            </div>
        </>
    );
}
