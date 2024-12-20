import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function Form({ data, setData, errors, subjects, gradeForms, setGradeForms, selectedGrades, handleGradeFormChange, addGradeForm, removeGradeForm, addGrades, removeGrade, processing, submit }) {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-6">Add New Grades</h2>

                    {gradeForms.map((gradeForm, index) => (
                        <div key={gradeForm.id} className="mb-6 bg-gray-50 rounded-lg p-6 relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Subject & Type */}
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor={`subject_id_${index}`} value="Subject" />
                                        <SelectInput
                                            name="subject_id"
                                            value={gradeForm.subject_id}
                                            onChange={(e) => handleGradeFormChange(index, e)}
                                            className="block w-full mt-1"
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects?.map(subject => (
                                                <option key={subject.id} value={subject.id}>
                                                    {subject.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor={`type_${index}`} value="Type" />
                                        <SelectInput
                                            name="type"
                                            value={gradeForm.type}
                                            onChange={(e) => handleGradeFormChange(index, e)}
                                            className="block w-full mt-1"
                                        >
                                            <option value="">Select Type</option>
                                            {['Quiz', 'Assignment', 'Mid Test', 'Final Test'].map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                </div>

                                {/* Grade & KKM */}
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor={`grade_${index}`} value="Grade" />
                                        <TextInput
                                            type="number"
                                            name="grade"
                                            value={gradeForm.grade}
                                            onChange={(e) => handleGradeFormChange(index, e)}
                                            className="block w-full mt-1"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor={`kkm_${index}`} value="KKM" />
                                        <TextInput
                                            type="number"
                                            name="kkm"
                                            value={gradeForm.kkm}
                                            onChange={(e) => handleGradeFormChange(index, e)}
                                            className="block w-full mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <InputLabel value="Difference" />
                                        <div className="mt-1 p-2 bg-gray-100 rounded-md text-gray-700">
                                            {gradeForm.difference || '-'}
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel value="Reward Amount" />
                                        <div className="mt-1 p-2 bg-gray-100 rounded-md text-gray-700">
                                            {gradeForm.reward_amount ? new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(gradeForm.reward_amount) : '-'}
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor={`date_${index}`} value="Date" />
                                        <TextInput
                                            type="date"
                                            name="date"
                                            value={gradeForm.date}
                                            onChange={(e) => handleGradeFormChange(index, e)}
                                            className="block w-full mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Remove Button */}
                            {gradeForms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeGradeForm(index)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={addGradeForm}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Add Another Grade
                        </button>
                        <PrimaryButton onClick={addGrades}>
                            Add to Summary
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            {/* Summary Section */}
            <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-6">Reward Summary</h2>

                    {selectedGrades.length > 0 ? (
                        <div className="space-y-4">
                            {selectedGrades.map(grade => (
                                <div key={grade.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="space-y-1">
                                        <p className="font-medium">{subjects.find(s => s.id === grade.subject_id)?.name}</p>
                                        <p className="text-sm text-gray-600">Grade: {grade.grade} | KKM: {grade.kkm}</p>
                                        <p className="text-sm font-medium text-green-600">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(grade.reward_amount)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeGrade(grade.id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="mt-6 pt-6 border-t">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-medium">Total Reward</span>
                                    <span className="text-lg font-bold text-green-600">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(data.total_reward_amount)}
                                    </span>
                                </div>

                                <PrimaryButton
                                    onClick={submit}
                                    disabled={processing}
                                    className="w-full justify-center"
                                >
                                    {processing ? 'Processing...' : 'Create Reward'}
                                </PrimaryButton>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No grades added yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
