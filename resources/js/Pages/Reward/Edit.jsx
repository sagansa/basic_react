import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';

export default function Edit({ auth, reward }) {
    const { data, setData, put, processing, errors } = useForm({
        total_payment: reward.total_payment,
        status: reward.status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('rewards.update', reward.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Reward</h2>}
        >
            <Head title="Edit Reward" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="total_payment" value="Payment Amount" />
                                    <TextInput
                                        id="total_payment"
                                        type="number"
                                        className="block w-full mt-1"
                                        value={data.total_payment}
                                        onChange={e => setData('total_payment', e.target.value)}
                                    />
                                    <InputError message={errors.total_payment} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="status" value="Status" />
                                    <SelectInput
                                        id="status"
                                        className="block w-full mt-1"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="unpaid">Unpaid</option>
                                        <option value="paid">Paid</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <PrimaryButton disabled={processing}>
                                        Update Reward
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
