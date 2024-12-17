// resources/js/Components/CreateRole.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateRole() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => reset('name'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="name" value="Role Name" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <PrimaryButton className="w-full" processing={processing}>
                Create Role
            </PrimaryButton>
        </form>
    );
}
