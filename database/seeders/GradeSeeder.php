<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        // Create Grade Permissions
        $gradePermissions = [
            'view_grades',
            'create_grades',
            'edit_grades',
            'delete_grades',
        ];

        foreach ($gradePermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($gradePermissions);
        }
    }
}
