<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| 
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider and assigned
| to the "api" middleware group. All routes will be prefixed with /api.
|
*/

/*
|--------------------------------------------------------------------------
| Public Test / Health Check Route
|--------------------------------------------------------------------------
| Used to verify frontend-backend connectivity.
| No authentication required.
*/
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'status' => 'ok',
        'message' => 'Backend API is reachable'
    ], 200);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Placeholder)
|--------------------------------------------------------------------------
| These will be implemented in later sprints.
*/
Route::post('/auth/login', function () {
    return response()->json([
        'success' => true,
        'message' => 'Login endpoint placeholder'
    ]);
});

Route::post('/auth/register', function () {
    return response()->json([
        'success' => true,
        'message' => 'Register endpoint placeholder'
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes Example
|--------------------------------------------------------------------------
| These routes require authentication (to be enforced later).
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    });

});

Route::middleware('auth:sanctum')->get('/sanctum-test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Sanctum authentication successful'
    ]);
});

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json([
            'message' => 'Welcome to the admin dashboard'
        ]);
    });
});

Route::middleware(['auth:sanctum', 'role:staff'])->prefix('staff')->group(function () {
    Route::get('/tasks', function () {
        return response()->json([
            'message' => 'Welcome to the staff tasks area'
        ]);
    });
});

Route::middleware(['auth:sanctum', 'role:user'])->prefix('user')->group(function () {
    Route::get('/profile', function () {
        return response()->json([
            'message' => 'Welcome to the user profile area'
        ]);
    });
});

Route::middleware(['auth:sanctum', 'role:admin|staff'])->prefix('management')->group(function () {
    Route::get('/reports', function () {
        return response()->json([
            'message' => 'Reports area'
        ]);
    });
});