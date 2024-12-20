import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Index({ auth, grades }) {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredGrades = grades.filter(grade =>
        grade.subject.name.toLowerCase().includes(search.toLowerCase()) ||
        grade.type.toLowerCase().includes(search.toLowerCase())
    );

    const deleteGrade = (id) => {
        if (confirm('Are you sure you want to delete this grade?')) {
            router.delete(route('grades.destroy', id));
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'paid':
                return 'bg-blue-100 text-blue-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default: // not_verified
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatNumber = (number) => {
        return Math.round(number).toLocaleString('id-ID');
    };

    const getDifferenceColor = (difference) => {
        return difference > 0 ? 'text-green-600' : 'text-red-600';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Grades</h2>}
        >
            <Head title="Grades" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between mb-6">
                                <TextInput
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <Link href={route('grades.create')}>
                                    <PrimaryButton>Create Grade</PrimaryButton>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead>
                                        <tr className="font-bold text-left bg-gray-50 dark:bg-gray-700">
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Subject</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Type</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Date</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Grade</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">KKM</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Difference</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Status</th>
                                            <th className="px-6 pt-5 pb-4 dark:text-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades.map((grade) => (
                                            <tr key={grade.id} className="hover:bg-gray-50 focus-within:bg-gray-50 dark:hover:bg-gray-700 dark:focus-within:bg-gray-700">
                                                <td className="px-6 py-4 border-t">{grade.subject.name}</td>
                                                <td className="px-6 py-4 border-t">{grade.type}</td>
                                                <td className="px-6 py-4 border-t">
                                                    {formatDate(grade.date)}
                                                </td>
                                                <td className="px-6 py-4 border-t">{formatNumber(grade.grade)}</td>
                                                <td className="px-6 py-4 border-t">{formatNumber(grade.kkm)}</td>
                                                <td className={`px-6 py-4 border-t font-semibold ${getDifferenceColor(grade.difference)}`}>
                                                    {formatNumber(grade.difference)}
                                                </td>
                                                <td className="px-6 py-4 border-t">
                                                    <span className={`px-2 py-1 rounded ${getStatusColor(grade.status)}`}>
                                                        {grade.status.replace('_', ' ').charAt(0).toUpperCase() + grade.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center gap-4">
                                                        <Link href={route('grades.edit', grade.id)}>
                                                            <SecondaryButton>
                                                                Edit
                                                            </SecondaryButton>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
