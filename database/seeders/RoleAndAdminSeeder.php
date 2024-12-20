<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Buat permission untuk manajemen roles
        $rolePermissions = [
            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',
        ];

        // Buat permission untuk manajemen permissions
        $permissionManagement = [
            'view_permissions',
            'create_permissions',
            'edit_permissions',
            'delete_permissions',
            // 'assign_permissions',
        ];

        // Buat permission untuk manajemen users
        $userPermissions = [
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            // 'assign_roles',
        ];

        // Gabungkan semua permission
        $allPermissions = array_merge($rolePermissions, $permissionManagement, $userPermissions);

        // Buat semua permission
        foreach ($allPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Buat role super-admin
        $superAdmin = Role::create([
            'name' => 'super-admin',
            'guard_name' => 'web'
        ]);

        $user = Role::create([
            'name' => 'user',
            'guard_name' => 'web'
        ]);

        // Berikan semua permission ke role super-admin
        $superAdmin->givePermissionTo(Permission::all());

        // Buat user super-admin
        $user = User::create([
            'name' => 'Dityo',
            'email' => 'dityo.enggar@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Assign role ke user
        $user->assignRole($superAdmin);
    }
}
