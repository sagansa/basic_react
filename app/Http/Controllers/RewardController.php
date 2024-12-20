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
        $isAdmin = auth()->user()->hasRole(['admin', 'super-admin']);

        $rewardsQuery = GradeReward::with(['grade.subject', 'user']);

        // Jika bukan admin, filter berdasarkan user_id
        if (!$isAdmin) {
            $rewardsQuery->where('user_id', auth()->user()->id);
        }

        $rewards = $rewardsQuery->latest()->get();

        // Summary juga perlu disesuaikan
        if ($isAdmin) {
            $summary = [
                'total_reward_amount' => GradeReward::sum('total_reward_amount'),
                'total_payment' => GradeReward::where('status', 'paid')
                    ->sum('total_payment'),
            ];
        } else {
            $summary = [
                'total_reward_amount' => GradeReward::where('user_id', auth()->user()->id)
                    ->sum('total_reward_amount'),
                'total_payment' => GradeReward::where('user_id', auth()->user()->id)
                    ->where('status', 'paid')
                    ->sum('total_payment'),
            ];
        }

        return Inertia::render('Reward/Index', [
            'rewards' => $rewards,
            'summary' => $summary,
            'isAdmin' => $isAdmin
        ]);
    }

    public function store(Request $request)
    {
        // Pastikan hanya user yang bisa store
        if (!auth()->user()->hasRole('user')) {
            abort(403, 'Only users can create rewards.');
        }

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
            'status' => 'required|in:' . implode(',', GradeReward::STATUSES),
        ]);

        // Pastikan user hanya bisa membuat reward untuk dirinya sendiri
        if ($validated['user_id'] !== auth()->id()) {
            abort(403, 'You can only create rewards for yourself.');
        }

        // Hitung total reward dari semua grade
        $totalReward = collect($validated['grades'])->sum('reward_amount');

        // Buat reward dengan total yang benar
        $reward = GradeReward::create([
            'user_id' => $validated['user_id'],
            'total_reward_amount' => $totalReward,
            'total_payment' => 0, // Set default 0
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
        $isAdmin = auth()->user()->hasRole('admin');

        // Jika bukan admin, pastikan hanya bisa update reward miliknya
        if (!$isAdmin && $reward->user_id !== auth()->id()) {
            abort(403, 'You can only update your own rewards.');
        }

        // Validasi yang sama untuk admin dan user
        $validated = $request->validate([
            'total_payment' => 'required|numeric|min:0',
            'status' => 'required|in:' . implode(',', GradeReward::STATUSES),
        ]);

        $reward->update($validated);

        return redirect()->route('rewards.index')
            ->with('message', 'Reward updated successfully.');
    }

    public function destroy(GradeReward $reward)
    {
        $isAdmin = auth()->user()->hasRole(['admin', 'super-admin']);

        // Jika bukan admin dan status paid, tolak akses
        if (!$isAdmin && $reward->status === 'paid') {
            abort(403, 'Cannot delete reward that has been paid.');
        }

        // Jika bukan admin dan bukan pemilik reward, tolak akses
        if (!$isAdmin && $reward->user_id !== auth()->id()) {
            abort(403, 'You can only delete your own rewards.');
        }

        $reward->delete();
        return redirect()->route('rewards.index')
            ->with('message', 'Reward deleted successfully.');
    }

    public function create()
    {
        // Pastikan hanya user yang bisa mengakses
        if (!auth()->user()->hasRole('user')) {
            return redirect()->route('rewards.index')
                ->with('message', 'Only users can create rewards.');
        }

        $grades = Grade::where('user_id', auth()->id())
            ->where('status', 'verified')
            ->whereDoesntHave('rewards')
            ->with('subject')
            ->get();

        $subjects = Subject::orderBy('name')->get();

        return Inertia::render('Reward/Create', [
            'grades' => $grades,
            'subjects' => $subjects
        ]);
    }

    public function edit(GradeReward $reward)
    {
        $isAdmin = auth()->user()->hasRole(['admin', 'super-admin']);

        // Jika bukan admin dan status paid, tolak akses
        if (!$isAdmin && $reward->status === 'paid') {
            abort(403, 'Cannot edit reward that has been paid.');
        }

        // Jika bukan admin dan bukan pemilik reward, tolak akses
        if (!$isAdmin && $reward->user_id !== auth()->id()) {
            abort(403, 'You can only edit your own rewards.');
        }

        return Inertia::render('Reward/Edit', [
            'reward' => $reward->load(['grade.subject', 'user']),
            'subjects' => Subject::orderBy('name')->get()
        ]);
    }
}
