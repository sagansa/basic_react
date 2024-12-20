import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Form({ data, setData, subjects, errors, processing, submit }) {
    const gradeTypes = ['Quiz', 'Assignment', 'Mid Test', 'Final Test'];

    return (
        <form onSubmit={submit}>
            <div className="mt-4">
                <InputLabel htmlFor="subject" value="Subject" />
                <select
                    name="subject_id"
                    value={data.subject_id}
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={e => setData('subject_id', e.target.value)}
                >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                            {subject.name}
                        </option>
                    ))}
                </select>
                <InputError message={errors.subject_id} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="type" value="Type" />
                <select
                    name="type"
                    value={data.type}
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={e => setData('type', e.target.value)}
                >
                    <option value="">Select Type</option>
                    {gradeTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="date" value="Date" />
                <TextInput
                    id="date"
                    type="date"
                    name="date"
                    value={data.date}
                    className="block w-full mt-1"
                    onChange={e => setData('date', e.target.value)}
                />
                <InputError message={errors.date} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="grade" value="Grade" />
                <TextInput
                    id="grade"
                    type="number"
                    name="grade"
                    value={data.grade}
                    className="block w-full mt-1"
                    onChange={e => setData('grade', e.target.value)}
                />
                <InputError message={errors.grade} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="kkm" value="KKM" />
                <TextInput
                    id="kkm"
                    type="number"
                    name="kkm"
                    value={data.kkm}
                    className="block w-full mt-1"
                    onChange={e => setData('kkm', e.target.value)}
                />
                <InputError message={errors.kkm} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="notes" value="Notes" />
                <textarea
                    name="notes"
                    value={data.notes}
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={e => setData('notes', e.target.value)}
                    rows="3"
                />
                <InputError message={errors.notes} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" disabled={processing}>
                    {processing ? 'Processing...' : 'Save'}
                </PrimaryButton>
            </div>
        </form>
    );
}
