<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\GradeReward;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RewardController extends Controller
{
    public function index()
    {
        return Inertia::render('Reward/Index', [
            'rewards' => GradeReward::with(['grade.subject'])
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->get(),
            'summary' => [
                'total_reward_amount' => GradeReward::where('user_id', auth()->user()->id)
                    ->sum('total_reward_amount'),
                'total_payment' => GradeReward::where('user_id', auth()->user()->id)
                    ->where('status', 'paid')
                    ->sum('total_payment'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'grades' => 'required|array|min:1',
            'grades.*.subject_id' => 'required|exists:subjects,id',
            'grades.*.type' => 'required|in:' . implode(',', Grade::TYPES),
            'grades.*.grade' => 'required|numeric|min:0|max:100',
            'grades.*.kkm' => 'required|numeric|min:0|max:100',
            'grades.*.difference' => 'required|numeric|min:0',
            'grades.*.reward_amount' => 'required|numeric|min:0',
            'grades.*.date' => 'required|date',
            'total_reward_amount' => 'required|numeric|min:0',
            'total_payment' => 'required|numeric|min:0',
            'status' => 'required|in:' . implode(',', GradeReward::STATUSES),
        ]);

        // Buat reward
        $reward = GradeReward::create([
            'user_id' => $validated['user_id'],
            'total_reward_amount' => $validated['total_reward_amount'],
            'total_payment' => $validated['total_payment'],
            'status' => $validated['status'],
        ]);

        // Buat grade-grade yang terkait
        foreach ($validated['grades'] as $gradeData) {
            Grade::create([
                'subject_id' => $gradeData['subject_id'],
                'type' => $gradeData['type'],
                'grade' => $gradeData['grade'],
                'kkm' => $gradeData['kkm'],
                'difference' => $gradeData['difference'],
                'reward_amount' => $gradeData['reward_amount'],
                'date' => $gradeData['date'],
                'user_id' => $validated['user_id'],
                'status' => 'verified',
                'grade_reward_id' => $reward->id
            ]);
        }

        return redirect()->route('rewards.index')
            ->with('message', 'Reward created successfully.');
    }

    public function update(Request $request, GradeReward $reward)
    {
        $validated = $request->validate([
            'total_payment' => 'required|numeric|min:0',
            'status' => 'required|in:paid,unpaid',
        ]);

        $reward->update($validated);

        return redirect()->route('rewards.index')
            ->with('message', 'Reward updated successfully.');
    }

    public function destroy(GradeReward $reward)
    {
        $reward->delete();
        return redirect()->route('rewards.index')
            ->with('message', 'Reward deleted successfully.');
    }

    public function create()
    {
        $grades = Grade::where('user_id', auth()->id())
            ->where('status', 'verified')
            ->whereDoesntHave('rewards')
            ->with('subject')
            ->get();

        // Pastikan mengambil semua subject yang aktif
        $subjects = Subject::orderBy('name')->get();

        // Debug untuk memastikan data terkirim
        // dd($subjects);

        return Inertia::render('Reward/Create', [
            'grades' => $grades,
            'subjects' => $subjects
        ]);
    }

    public function edit(GradeReward $reward)
    {
        return Inertia::render('Reward/Edit', [
            'reward' => $reward->load('grade.subject')
        ]);
    }
}
