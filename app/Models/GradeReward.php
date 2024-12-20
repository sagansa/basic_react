<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GradeReward extends Model
{
    protected $fillable = [
        'user_id',
        'total_reward_amount',
        'total_payment',
        'status'
    ];

    const STATUSES = ['paid','unpaid'];

    public function grade()
    {
        return $this->hasMany(Grade::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
