import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function AdminForm({ data, setData, errors, processing, submit }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to:`, value);
        setData(name, value);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Update Reward</h2>

            <form onSubmit={submit} className="space-y-6">
                {/* User Info (Read Only) */}
                <div>
                    <InputLabel value="User" />
                    <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                        {data.user?.name}
                    </div>
                </div>

                {/* Grades List (Read Only) */}
                <div>
                    <InputLabel value="Grades" />
                    <div className="mt-2 space-y-2">
                        {data.grades?.map(grade => (
                            <div key={grade.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {grade.subject?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Type: {grade.type} | Grade: {grade.grade} | KKM: {grade.kkm}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Date: {new Date(grade.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(grade.reward_amount)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Reward Amount (Read Only) */}
                <div>
                    <InputLabel value="Total Reward Amount" />
                    <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(data.total_reward_amount)}
                    </div>
                </div>

                {/* Total Payment (Editable) */}
                <div>
                    <InputLabel htmlFor="total_payment" value="Total Payment" />
                    <TextInput
                        id="total_payment"
                        type="number"
                        name="total_payment"
                        value={data.total_payment}
                        onChange={handleInputChange}
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.total_payment} className="mt-2" />
                </div>

                {/* Status (Editable) */}
                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <SelectInput
                        id="status"
                        name="status"
                        value={data.status}
                        onChange={handleInputChange}
                        className="block w-full mt-1"
                    >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Reward'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
