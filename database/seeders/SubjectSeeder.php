<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjectPermissions = [
            'view_subjects',
            'create_subjects',
            'edit_subjects',
            'delete_subjects',
        ];

        foreach ($subjectPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'super-admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($subjectPermissions);
        }
    }
}
