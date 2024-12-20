import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';
import Form from './Form';
import { useState } from 'react';

export default function Create({ auth, grades, subjects = [] }) {
    const [selectedGrades, setSelectedGrades] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        grades: [],
        total_reward_amount: 0,
        total_payment: 0,
        status: 'unpaid'
    });

    // Form state untuk multiple grade forms
    const [gradeForms, setGradeForms] = useState([{
        id: Date.now(),
        subject_id: '',
        type: '',
        grade: '',
        kkm: '',
        difference: '',
        reward_amount: '',
        date: ''
    }]);

    // Fungsi untuk menghitung difference
    const calculateDifference = (grade, kkm) => {
        if (!grade || !kkm) return '';
        return Math.max(0, parseInt(grade) - parseInt(kkm));
    };

    // Fungsi untuk menghitung reward amount
    const calculateRewardAmount = (grade, difference) => {
        if (parseInt(grade) === 100) {
            return 100000;
        }
        return parseInt(difference) * 1000;
    };

    // Handle perubahan pada form grade
    const handleGradeFormChange = (index, e) => {
        const { name, value } = e.target;
        const newGradeForms = [...gradeForms];

        newGradeForms[index] = {
            ...newGradeForms[index],
            [name]: value
        };

        // Hitung difference dan reward_amount saat grade atau kkm berubah
        if (name === 'grade' || name === 'kkm') {
            const grade = name === 'grade' ? value : newGradeForms[index].grade;
            const kkm = name === 'kkm' ? value : newGradeForms[index].kkm;
            const difference = calculateDifference(grade, kkm);

            newGradeForms[index].difference = difference;
            if (difference !== '') {
                newGradeForms[index].reward_amount = calculateRewardAmount(grade, difference);
            }
        }

        setGradeForms(newGradeForms);
    };

    // Fungsi untuk menambahkan semua grade ke daftar
    const addGrades = (e) => {
        e.preventDefault();

        const validGrades = gradeForms.filter(form =>
            form.subject_id && form.type && form.grade && form.kkm && form.date
        ).map(grade => {
            const difference = calculateDifference(grade.grade, grade.kkm);
            const reward_amount = calculateRewardAmount(grade.grade, difference);

            return {
                subject_id: grade.subject_id,
                type: grade.type,
                grade: grade.grade,
                kkm: grade.kkm,
                difference: difference,
                reward_amount: reward_amount,
                date: grade.date,
                id: grade.id,
                status: 'verified'
            };
        });

        setSelectedGrades(prev => [...prev, ...validGrades]);

        // Update data form dengan grades yang baru
        setData(prev => ({
            ...prev,
            grades: [...selectedGrades, ...validGrades],
            total_reward_amount: validGrades.reduce((total, grade) => total + grade.reward_amount, 0)
        }));

        // Reset forms
        setGradeForms([{
            id: Date.now(),
            subject_id: '',
            type: '',
            grade: '',
            kkm: '',
            difference: '',
            reward_amount: '',
            date: ''
        }]);
    };

    // Tambahkan fungsi removeGrade
    const removeGrade = (gradeId) => {
        const updatedGrades = selectedGrades.filter(g => g.id !== gradeId);
        setSelectedGrades(updatedGrades);

        // Update total reward dan data form
        const newTotalReward = updatedGrades.reduce((total, grade) => total + grade.reward_amount, 0);
        setData(prev => ({
            ...prev,
            grades: updatedGrades,
            total_reward_amount: newTotalReward
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rewards.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create Reward</h2>}
        >
            <Head title="Create Reward" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Form
                                data={data}
                                setData={setData}
                                errors={errors}
                                subjects={subjects}
                                gradeForms={gradeForms}
                                setGradeForms={setGradeForms}
                                selectedGrades={selectedGrades}
                                handleGradeFormChange={handleGradeFormChange}
                                addGrades={addGrades}
                                removeGrade={removeGrade}
                                processing={processing}
                                submit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
