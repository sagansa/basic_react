<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleAndAdminSeeder::class,
            // GradeSeeder::class,
            RewardSeeder::class,
            SubjectSeeder::class,
        ]);
    }
}
