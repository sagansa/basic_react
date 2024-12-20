import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Form from './Form';

export default function Create({ auth, subjects }) {
    const { data, setData, post, processing, errors } = useForm({
        subject_id: '',
        type: '',
        date: '',
        grade: '',
        kkm: '',
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('grades.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create Grade</h2>}
        >
            <Head title="Create Grade" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Form
                                data={data}
                                setData={setData}
                                subjects={subjects}
                                errors={errors}
                                processing={processing}
                                submit={submit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
