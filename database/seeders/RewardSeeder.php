<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RewardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rewardPermissions = [
            'view_rewards',
            'create_rewards',
            'edit_rewards',
            'delete_rewards',
        ];

        foreach ($rewardPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'super-admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($rewardPermissions);
        }
    }
}
