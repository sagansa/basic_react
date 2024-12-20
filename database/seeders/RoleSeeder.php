<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::create([
            'name' => 'super-admin',
            'guard_name' => 'web'
        ]);

        // Opsional: Berikan semua permission ke super-admin
        $permissions = Permission::all();
        $role->syncPermissions($permissions);
    }
}
