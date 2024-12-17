<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('role_or_permission:publish articles')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/roles-permissions', [RolePermissionController::class, 'index'])->name('roles-permissions.index');
//     Route::post('/roles', [RolePermissionController::class, 'storeRole'])->name('roles.store');
//     Route::post('/permissions', [RolePermissionController::class, 'storePermission'])->name('permissions.store');
//     Route::post('/assign-permission', [RolePermissionController::class, 'assignPermission'])->name('permissions.assign');
//     Route::get('/roles', [RolePermissionController::class, 'index'])->name('roles.index');
//     Route::post('/roles', [RolePermissionController::class, 'store'])->name('roles.store');
//     Route::get('/roles/{role}/edit', [RolePermissionController::class, 'edit'])->name('roles.edit');
//     Route::put('/roles/{role}', [RolePermissionController::class, 'update'])->name('roles.update');
//     Route::delete('/roles/{role}', [RolePermissionController::class, 'destroy'])->name('roles.destroy');
// });

// Route::middleware(['auth'])->group(function () {
//     Route::resource('roles', RoleController::class);
// });

Route::prefix('/')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        });

require __DIR__.'/auth.php';
