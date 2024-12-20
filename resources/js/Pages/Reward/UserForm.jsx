import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import DangerButton from '@/Components/DangerButton';

export default function UserForm({ data, setData, errors, processing, submit, subjects }) {
    const calculateDifference = (grade, kkm) => {
        if (!grade || !kkm) return '';
        return Math.max(0, parseInt(grade) - parseInt(kkm));
    };

    const calculateRewardAmount = (grade, difference) => {
        if (parseInt(grade) === 100) {
            return 100000;
        }
        return parseInt(difference) * 1000;
    };

    const handleGradeChange = (index, field, value) => {
        const updatedGrades = [...data.grades];
        updatedGrades[index] = {
            ...updatedGrades[index],
            [field]: value
        };

        if (field === 'grade' || field === 'kkm') {
            const grade = field === 'grade' ? value : updatedGrades[index].grade;
            const kkm = field === 'kkm' ? value : updatedGrades[index].kkm;
            const difference = calculateDifference(grade, kkm);
            updatedGrades[index].difference = difference;
            if (difference !== '') {
                updatedGrades[index].reward_amount = calculateRewardAmount(grade, difference);
            }
        }

        setData('grades', updatedGrades);

        // Update total reward amount
        const totalReward = updatedGrades.reduce((sum, grade) =>
            sum + (grade.reward_amount || 0), 0
        );
        setData('total_reward_amount', totalReward);
    };

    const addGrade = () => {
        const newGrade = {
            id: Date.now(),
            subject_id: '',
            type: '',
            grade: '',
            kkm: '',
            difference: '',
            reward_amount: '',
            date: ''
        };
        setData('grades', [...data.grades, newGrade]);
    };

    const removeGrade = (index) => {
        const updatedGrades = data.grades.filter((_, i) => i !== index);
        setData('grades', updatedGrades);

        // Update total reward amount
        const totalReward = updatedGrades.reduce((sum, grade) =>
            sum + (grade.reward_amount || 0), 0
        );
        setData('total_reward_amount', totalReward);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-4">
                {data.grades.map((grade, index) => (
                    <div key={grade.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Subject */}
                            <div>
                                <InputLabel htmlFor={`subject_${index}`} value="Subject" />
                                <SelectInput
                                    id={`subject_${index}`}
                                    value={grade.subject_id}
                                    onChange={(e) => handleGradeChange(index, 'subject_id', e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors[`grades.${index}.subject_id`]} className="mt-2" />
                            </div>

                            {/* Type */}
                            <div>
                                <InputLabel htmlFor={`type_${index}`} value="Type" />
                                <SelectInput
                                    id={`type_${index}`}
                                    value={grade.type}
                                    onChange={(e) => handleGradeChange(index, 'type', e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Quiz">Quiz</option>
                                    <option value="Assignment">Assignment</option>
                                    <option value="Mid Test">Mid Test</option>
                                    <option value="Final Test">Final Test</option>
                                </SelectInput>
                                <InputError message={errors[`grades.${index}.type`]} className="mt-2" />
                            </div>

                            {/* Grade */}
                            <div>
                                <InputLabel htmlFor={`grade_${index}`} value="Grade" />
                                <TextInput
                                    id={`grade_${index}`}
                                    type="number"
                                    value={grade.grade}
                                    onChange={(e) => handleGradeChange(index, 'grade', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors[`grades.${index}.grade`]} className="mt-2" />
                            </div>

                            {/* KKM */}
                            <div>
                                <InputLabel htmlFor={`kkm_${index}`} value="KKM" />
                                <TextInput
                                    id={`kkm_${index}`}
                                    type="number"
                                    value={grade.kkm}
                                    onChange={(e) => handleGradeChange(index, 'kkm', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors[`grades.${index}.kkm`]} className="mt-2" />
                            </div>

                            {/* Difference (Read Only) */}
                            <div>
                                <InputLabel htmlFor={`difference_${index}`} value="Difference" />
                                <TextInput
                                    id={`difference_${index}`}
                                    type="number"
                                    value={grade.difference}
                                    className="mt-1 block w-full bg-gray-100"
                                    readOnly
                                />
                            </div>

                            {/* Reward Amount (Read Only) */}
                            <div>
                                <InputLabel htmlFor={`reward_${index}`} value="Reward Amount" />
                                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                                    {formatCurrency(grade.reward_amount)}
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <InputLabel htmlFor={`date_${index}`} value="Date" />
                                <TextInput
                                    id={`date_${index}`}
                                    type="date"
                                    value={grade.date}
                                    onChange={(e) => handleGradeChange(index, 'date', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors[`grades.${index}.date`]} className="mt-2" />
                            </div>

                            {/* Remove Button */}
                            <div className="flex items-center mt-4">
                                <DangerButton
                                    type="button"
                                    onClick={() => removeGrade(index)}
                                >
                                    Remove
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Reward Amount (Read Only) */}
            <div>
                <InputLabel value="Total Reward Amount" />
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                    {formatCurrency(data.total_reward_amount)}
                </div>
            </div>

            <div className="flex justify-between">
                <PrimaryButton
                    type="button"
                    onClick={addGrade}
                >
                    Add Grade
                </PrimaryButton>

                <div className="flex gap-2">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : 'Save Reward'}
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
